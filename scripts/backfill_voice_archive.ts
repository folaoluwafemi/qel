import fs from "node:fs";
import path from "node:path";
import * as dotenv from "dotenv";
import { AiRouter } from "../packages/ai-router/src";

dotenv.config();

const aiRouter = new AiRouter();

interface BackfillOptions {
  sourceDir: string;
  userId: string;
  dryRun?: boolean;
}

async function runVoiceArchiveBackfill(options: BackfillOptions) {
  console.log("=================================================");
  console.log("QEL: 2-YEAR VOICE MEMO ARCHIVE INGESTION PIPELINE");
  console.log("=================================================");
  console.log(`Scanning directory: ${options.sourceDir}`);

  if (!fs.existsSync(options.sourceDir)) {
    console.error(`Directory not found: ${options.sourceDir}`);
    console.log("Please create the folder or provide the valid path to your voice memos.");
    return;
  }

  const files = fs.readdirSync(options.sourceDir).filter((file) => {
    return /\.(m4a|mp3|wav|ogg|aac)$/i.test(file);
  });

  console.log(`Found ${files.length} voice memo files.`);

  if (files.length === 0) {
    console.log("No audio files detected. Place your voice memo files in the directory to begin backfill.");
    return;
  }

  let processedCount = 0;
  const extractedEpiphanies: Array<{ title: string; date: string; quote: string }> = [];

  for (const file of files) {
    const filePath = path.join(options.sourceDir, file);
    const stats = fs.statSync(filePath);
    const recordedAt = stats.mtime; // Historical Ground Truth Timestamp

    console.log(`\n[${++processedCount}/${files.length}] Ingesting: ${file}`);
    console.log(`Recorded at: ${recordedAt.toLocaleString()}`);

    try {
      if (options.dryRun) {
        console.log("Dry run: Skipping API transcription.");
        continue;
      }

      // Check if Groq API key is configured
      if (!process.env.GROQ_API_KEY) {
        console.warn("GROQ_API_KEY not found in .env. Skipping transcription for this step.");
        continue;
      }

      const fileStream = fs.createReadStream(filePath);
      const transcription = await aiRouter.groq.transcribeAudio(fileStream as any);

      console.log(`Transcribed (${transcription.durationSeconds?.toFixed(1)}s): "${transcription.text.slice(0, 100)}..."`);

      // Extract acoustic prosody and fatigue markers
      const prosody = aiRouter.prosody.extractProsody(
        transcription.text,
        transcription.durationSeconds || 60,
        recordedAt
      );

      console.log(`Acoustic Profile -> Cadence: ${prosody.speechRateWpm} WPM | Fatigue Score: ${(prosody.fatigueScore * 100).toFixed(0)}%`);

      if (prosody.epiphanyQuotes.length > 0) {
        extractedEpiphanies.push({
          title: file,
          date: recordedAt.toISOString().split("T")[0],
          quote: prosody.epiphanyQuotes[0],
        });
      }
    } catch (err: any) {
      console.error(`Error processing ${file}:`, err?.message || err);
    }
  }

  console.log("\n=================================================");
  console.log("BACKFILL SUMMARY");
  console.log("=================================================");
  console.log(`Total Memos Ingested: ${processedCount}`);
  console.log(`Total Epiphanies Extracted: ${extractedEpiphanies.length}`);

  if (extractedEpiphanies.length > 0) {
    console.log("\nSample Epiphanies Discovered Across Your History:");
    for (const item of extractedEpiphanies.slice(0, 5)) {
      console.log(` • [${item.date}] "${item.quote}"`);
    }
  }
}

// Read CLI arguments
const targetDir = process.argv[2] || "./archive/voice_memos";
runVoiceArchiveBackfill({
  sourceDir: path.resolve(targetDir),
  userId: "user_owner",
  dryRun: false,
});
