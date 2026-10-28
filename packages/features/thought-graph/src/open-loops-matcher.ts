import { getDatabase, epistemicVoidIndex, causalLinks } from "@qel/database";
import { eq } from "drizzle-orm";
import { AiRouter } from "@qel/ai-router";
import type { OpenQuestion } from "./types";

export interface LoopResolutionResult {
  resolvedQuestionId: string;
  questionText: string;
  originalArtifactId: string;
  resolvingArtifactId: string;
  resolutionSummary: string;
}

export class OpenLoopsMatcher {
  private ai: AiRouter;

  constructor(groqApiKey?: string) {
    this.ai = new AiRouter(groqApiKey);
  }

  /**
   * Scans existing open questions and automatically connects them if this new thought answers them.
   */
  public async matchAndResolve(newArtifact: {
    id: string;
    text: string;
    title?: string;
  }): Promise<LoopResolutionResult[]> {
    if (!process.env.DATABASE_URL) {
      return [];
    }

    const db = getDatabase();
    // 1. Fetch all active open questions
    const openQuestions = await db
      .select()
      .from(epistemicVoidIndex)
      .where(eq(epistemicVoidIndex.status, "open"));

    if (openQuestions.length === 0) {
      return [];
    }

    const resolvedResults: LoopResolutionResult[] = [];

    for (const q of openQuestions) {
      // Don't match against the same artifact
      if (q.sourceArtifactId === newArtifact.id) continue;

      const match = await this.evaluateMatch(q.voidDescription, newArtifact.text);
      if (match.isResolved) {
        const now = new Date();

        // Mark open loop as resolved
        await db
          .update(epistemicVoidIndex)
          .set({
            status: "resolved",
            resolvedByArtifactId: newArtifact.id,
            resolutionNotes: match.explanation,
            resolvedAt: now,
          })
          .where(eq(epistemicVoidIndex.id, q.id));

        // Create a causal thought link connecting the original question's note to this resolving note
        await db.insert(causalLinks).values({
          sourceArtifactId: q.sourceArtifactId,
          targetArtifactId: newArtifact.id,
          relationType: "causal_precursor",
          confidenceWeight: match.confidence,
          synthesizedReasoning: `Auto-resolved open question: "${q.voidDescription}" -> ${match.explanation}`,
        });

        resolvedResults.push({
          resolvedQuestionId: q.id,
          questionText: q.voidDescription,
          originalArtifactId: q.sourceArtifactId,
          resolvingArtifactId: newArtifact.id,
          resolutionSummary: match.explanation,
        });
      }
    }

    return resolvedResults;
  }

  /**
   * Evaluates whether text resolves a specific question
   */
  private async evaluateMatch(
    question: string,
    newText: string
  ): Promise<{ isResolved: boolean; confidence: number; explanation: string }> {
    if (process.env.GROQ_API_KEY && newText.length > 10) {
      try {
        const prompt = `You are evaluating whether a new note answers an older open question.
Question: "${question}"
New Note: "${newText}"

Does this new note definitively answer, resolve, or provide the outcome to the question?
Reply with ONLY a JSON object:
{
  "isResolved": boolean,
  "confidence": number between 0.0 and 1.0,
  "explanation": "Brief 1-sentence explanation of how it answered the question"
}`;

        let output = "";
        await this.ai.groq.streamReasoning(
          {
            systemPrompt: "Evaluate question resolution. Output JSON only.",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.1,
          },
          (tok) => { output += tok; }
        );

        const parsed = JSON.parse(output.replace(/```json|```/g, "").trim());
        if (parsed.isResolved && parsed.confidence >= 0.75) {
          return {
            isResolved: true,
            confidence: parsed.confidence,
            explanation: parsed.explanation || "Answered in follow-up note.",
          };
        }
      } catch (err) {
        // Fall back to keyword heuristic below
      }
    }

    // Heuristic fallback: check for shared meaningful keywords
    const qKeywords = question.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(w => w.length > 3);
    const textLower = newText.toLowerCase();
    const matches = qKeywords.filter(kw => textLower.includes(kw));

    if (qKeywords.length > 0 && matches.length >= Math.ceil(qKeywords.length * 0.6)) {
      return {
        isResolved: true,
        confidence: 0.75,
        explanation: `Shared context match on keywords: ${matches.join(", ")}`,
      };
    }

    return { isResolved: false, confidence: 0, explanation: "" };
  }
}
