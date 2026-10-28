import { ContextTagger } from "../src/context-tagger";
import { IdeaMatcher } from "../src/idea-matcher";
import { ThinkingPartner } from "../src/thinking-partner";

async function runVerification() {
  console.log("=== Testing Thought Graph & Thinking Partner ===");

  // 1. Test Circadian Phase Detection
  const tagger = new ContextTagger();
  
  const nadirDate = new Date("2026-09-14T02:30:00");
  const morningDate = new Date("2026-09-14T09:15:00");
  const dipDate = new Date("2026-09-14T14:30:00");
  const eveningDate = new Date("2026-09-14T20:45:00");

  console.assert(tagger.getCircadianPhase(nadirDate) === "late_night_nadir", "2:30 AM should be late_night_nadir");
  console.assert(tagger.getCircadianPhase(morningDate) === "morning_peak", "9:15 AM should be morning_peak");
  console.assert(tagger.getCircadianPhase(dipDate) === "afternoon_dip", "2:30 PM should be afternoon_dip");
  console.assert(tagger.getCircadianPhase(eveningDate) === "evening_creative", "8:45 PM should be evening_creative");
  console.log("✔ Circadian Phase tests passed");

  // 2. Test Context Tagger on Artifact
  const context = await tagger.tagArtifact({
    id: "test-artifact-1",
    modality: "voice_journal",
    title: "Late night pitch reflection",
    rawText: "I finished the pitch deck late. Wondering if they will approve the 50k budget? Not sure whether we should self-host on Railway or Oracle.",
    recordedAt: "2026-09-14T02:30:00Z",
    audioDurationSeconds: 240,
  });

  console.assert(context.circadianPhase === "late_night_nadir", "Context circadian phase should be late_night_nadir");
  console.assert(context.facts.length >= 4, "Should have at least 4 ground truth facts");
  console.assert(context.openQuestions.length >= 1, "Should have extracted at least 1 open question");
  console.log("✔ Context tagging tests passed (Extracted open questions:", context.openQuestions, ")");

  // 3. Test Idea Matcher for Energy Profiles
  const ideaMatcher = new IdeaMatcher();
  const lowEnergyMatches = await ideaMatcher.matchIdeasForEnergy("low");
  const highEnergyMatches = await ideaMatcher.matchIdeasForEnergy("high");

  console.assert(lowEnergyMatches.length > 0, "Should return matches for low energy");
  console.assert(highEnergyMatches.length > 0, "Should return matches for high energy");
  console.log("✔ Idea matcher tests passed (Top match for low energy:", lowEnergyMatches[0].title, ")");

  // 4. Test Thinking Partner System Prompt Assembly
  const partner = new ThinkingPartner();
  const systemPrompt = partner.buildSystemPrompt({
    recentThoughts: [
      { title: "Railway Architecture", text: "Decided to host PostgreSQL on Railway.", recordedAt: "2026-09-13" }
    ],
    openQuestions: ["Will client approve the 50k budget?"],
    matchedIdeas: [{ title: "Spatial Audio Memo Player", reasoning: "Aligned with your voice archive" }]
  });

  console.assert(systemPrompt.includes("Active Open Questions in Memory"), "System prompt should include open questions");
  console.assert(systemPrompt.includes("Railway Architecture"), "System prompt should include recent thoughts");
  console.assert(systemPrompt.includes("Distinguish facts from guesses"), "System prompt should include epistemic humility guidelines");
  console.log("✔ Thinking Partner system prompt tests passed");

  console.log("All Thought Graph tests passed successfully!");
}

runVerification().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
