import { AiRouter } from "@qel/ai-router";
import { getDatabase, metaContextEnvelopes, epistemicVoidIndex } from "@qel/database";
import type { CircadianPhase, ThoughtContext, ThoughtFact, ThoughtInference } from "./types";

export class ContextTagger {
  private ai: AiRouter;

  constructor(groqApiKey?: string) {
    this.ai = new AiRouter(groqApiKey);
  }

  /**
   * Determine circadian biological phase based on recording timestamp
   */
  public getCircadianPhase(date: Date = new Date()): CircadianPhase {
    const hours = date.getHours();
    if (hours >= 1 && hours < 5) return "late_night_nadir";
    if (hours >= 8 && hours < 12) return "morning_peak";
    if (hours >= 13 && hours < 17) return "afternoon_dip";
    return "evening_creative";
  }

  /**
   * Tags a newly ingested artifact with facts, inferences, and open questions
   */
  public async tagArtifact(artifact: {
    id: string;
    modality: string;
    title?: string;
    rawText?: string;
    recordedAt?: string;
    audioDurationSeconds?: number;
    sourceUrl?: string;
  }): Promise<ThoughtContext> {
    const recordedDate = artifact.recordedAt ? new Date(artifact.recordedAt) : new Date();
    const circadian = this.getCircadianPhase(recordedDate);

    // 1. Ground Truth Facts (Confidence = 1.0)
    const facts: ThoughtFact[] = [
      { key: "recorded_at", value: recordedDate.toISOString(), confidence: 1.0 },
      { key: "modality", value: artifact.modality, confidence: 1.0 },
      { key: "circadian_phase", value: circadian, confidence: 1.0 },
    ];

    if (artifact.audioDurationSeconds) {
      facts.push({ key: "duration_seconds", value: artifact.audioDurationSeconds, confidence: 1.0 });
    }
    if (artifact.sourceUrl) {
      facts.push({ key: "source_domain", value: new URL(artifact.sourceUrl).hostname, confidence: 1.0 });
    }

    // 2. High-Confidence Signals & Inferences
    const inferences: ThoughtInference[] = [];
    const openQuestions: string[] = [];

    // Circadian inference
    if (circadian === "late_night_nadir") {
      inferences.push({
        label: "circadian_vulnerability",
        detail: "Recorded during biological nadir (1 AM - 5 AM); elevated likelihood of acute fatigue or cognitive distortion.",
        confidence: 0.85,
      });
    }

    const textToAnalyze = artifact.rawText || artifact.title || "";

    // 3. Optional LLM analysis using Groq for deep inference and open questions
    if (textToAnalyze.length > 20 && process.env.GROQ_API_KEY) {
      try {
        const prompt = `You are the cognitive context parser for Qel.
Analyze this user thought and output a strict JSON object with:
1. "inferences": array of objects { "label": string, "detail": string, "confidence": number between 0.0 and 0.95 }
   (e.g., emotional tone, cognitive state, unstated premises)
2. "openQuestions": array of strings listing unresolved questions or missing follow-ups
   (e.g. "Did the client approve the pitch?", "What was the actual bug cause?")
3. "confidenceScore": number between 0.5 and 1.0

Text:
"${textToAnalyze}"

Respond with ONLY valid JSON:`;

        let rawResponse = "";
        await this.ai.groq.streamReasoning(
          {
            systemPrompt: "You parse thoughts into structured facts, inferences, and open questions. Always reply in JSON.",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2,
          },
          (tok) => { rawResponse += tok; }
        );

        const parsed = JSON.parse(rawResponse.replace(/```json|```/g, "").trim());
        if (Array.isArray(parsed.inferences)) {
          inferences.push(...parsed.inferences);
        }
        if (Array.isArray(parsed.openQuestions)) {
          openQuestions.push(...parsed.openQuestions);
        }
      } catch (err) {
        // Graceful fallback to rule-based analysis
        this.extractRuleBasedQuestions(textToAnalyze, openQuestions);
      }
    } else {
      this.extractRuleBasedQuestions(textToAnalyze, openQuestions);
    }

    const overallConfidence = inferences.length > 0 
      ? inferences.reduce((acc, curr) => acc + curr.confidence, 0) / inferences.length
      : 1.0;

    const thoughtContext: ThoughtContext = {
      id: crypto.randomUUID(),
      artifactId: artifact.id,
      circadianPhase: circadian,
      facts,
      inferences,
      openQuestions,
      overallConfidence: Number(overallConfidence.toFixed(2)),
      createdAt: new Date().toISOString(),
    };

    // 4. Persist to Database if DATABASE_URL is available
    if (process.env.DATABASE_URL) {
      try {
        const db = getDatabase();
        await db.insert(metaContextEnvelopes).values({
          id: thoughtContext.id,
          artifactId: artifact.id,
          groundTruthFacts: facts.reduce((acc, f) => ({ ...acc, [f.key]: f.value }), {}),
          highConfidenceSignals: { circadianPhase: circadian },
          probabilisticInferences: inferences.reduce((acc, inf) => ({ ...acc, [inf.label]: inf }), {}),
          epistemicVoids: openQuestions,
          overallPrecisionScore: overallConfidence,
        });

        // Register each open question in the open loops index
        for (const q of openQuestions) {
          await db.insert(epistemicVoidIndex).values({
            sourceArtifactId: artifact.id,
            voidDescription: q,
            status: "open",
          });
        }
      } catch (dbErr) {
        console.warn("Could not persist context envelope to DB (offline/dev fallback):", dbErr);
      }
    }

    return thoughtContext;
  }

  private extractRuleBasedQuestions(text: string, questions: string[]) {
    // Detect question marks and uncertainty words
    const sentences = text.split(/[.?!]\s+/);
    for (const s of sentences) {
      if (s.includes("?") || /\b(wondering if|not sure whether|waiting to see|hope it)\b/i.test(s)) {
        questions.push(s.trim());
      }
    }
  }
}
