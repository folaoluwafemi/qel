# Feature Spec: Voice Journaling & Acoustic Prosody Engine
*Unconstrained Audio Ingestion, 2-Year Archive Backfill & Physiological Telemetry*

---

## 1. Feature Overview & Scope

The voice journaling pipeline processes unconstrained, stream-of-consciousness audio ranging from 30-second fleeting epiphanies to 45-minute late-night dumps.

It solves two critical problems:
1. **Semantic Extraction without Manual Sifting**: Automatically transcribes, chapters, extracts core epiphanies, and indexes concepts.
2. **Acoustic & Physiological Telemetry**: Extracts acoustic prosody (pitch variance, speech rate, vocal fatigue, pause density) to determine the user's physiological and mental state at the time of recording.

---

## 2. Audio Processing Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         AUDIO PROCESSING PIPELINE                        │
├──────────────────────────────────────────────────────────────────────────┤
│ 1. INGESTION (Direct R2 Upload via Presigned URL)                        │
│    • Preserves original recording metadata (timestamp, device, location) │
├──────────────────────────────────────────────────────────────────────────┤
│ 2. DUAL-PASS AI EXTRACTION (Cloudflare Queues Worker)                    │
│    • Pass 1 (Semantic): Whisper / Gemini Multimodal Audio Transcription   │
│      - Verbatim transcript                                               │
│      - Core epiphany pull-quotes                                         │
│      - Named entities & concepts                                         │
│    • Pass 2 (Prosodic & Physiological):                                  │
│      - Speech Rate: WPM (Words Per Minute) baseline comparison           │
│      - Vocal Fatigue Index: Spectral centroid & energy variance          │
│      - Circadian Window: Local time analysis (e.g. 2:30 AM nadir)        │
├──────────────────────────────────────────────────────────────────────────┤
│ 3. ENVELOPE WRAPPER & VECTOR INDEXING                                    │
│    • Compiles Meta-Context Envelope (Ground Truth vs. Inferred State)    │
│    • Generates 1536-d Semantic Embedding -> Cloudflare Vectorize         │
│    • Scans Epistemic Void Index for retroactive socket closure           │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 3. The 2-Year Historical Archive Backfill CLI

A dedicated high-concurrency CLI tool to ingest the existing 2-year voice memo backlog:

```typescript
// scripts/backfill_voice_memos.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "node:fs";
import path from "node:path";

export async function processVoiceArchive(directoryPath: string) {
  const files = fs.readdirSync(directoryPath).filter(f => /\.(m4a|mp3|wav)$/i.test(f));
  console.log(`Discovered ${files.length} historical voice memos.`);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);
    const originalTimestamp = stats.mtime; // Preserving historical ground truth

    // 1. Upload to Cloudflare R2
    // 2. Dispatch event to Cloudflare ingest-queue with historical timestamp
  }
}
```

---

## 4. UI Representation (Visual Waveform Card)

In the mymind visual stream and Canvas:
* Rendered as an interactive waveform card.
* Displays duration, timestamp, extracted epiphany pull-quote, and sentiment badge.
* Tap to play with inline audio scrubbing and synchronous transcript highlighting.
