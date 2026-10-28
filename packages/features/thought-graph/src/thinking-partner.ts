import { AiRouter } from "@qel/ai-router";
import type { SparringMessage } from "./types";

export interface ThinkingPartnerContext {
  recentThoughts?: Array<{ title?: string; text?: string; recordedAt?: string }>;
  openQuestions?: string[];
  activeEnergyLevel?: "low" | "medium" | "high";
  matchedIdeas?: Array<{ title: string; reasoning: string }>;
}

export class ThinkingPartner {
  private ai: AiRouter;

  constructor(groqApiKey?: string) {
    this.ai = new AiRouter(groqApiKey);
  }

  /**
   * Generates the grounded system prompt for the thinking partner
   */
  public buildSystemPrompt(context?: ThinkingPartnerContext): string {
    let prompt = `You are Qel, a personal thinking partner and sparring companion.
Your goal is to help the user think clearly, connect ideas across time, and test assumptions.

Core Tone & Rules:
1. Speak as a sharp, authentic peer—never like a customer service bot, life coach, or textbook.
2. Be direct and concise. Avoid fluff, filler, and throat-clearing.
3. Distinguish facts from guesses:
   - When something is a clear recorded fact, state it with conviction.
   - When offering an interpretation, intuition, or psychological guess, be humble ("I noticed in your notes...", "It feels like...").
   - When something is unknown or unanswered, acknowledge it openly ("We don't know the outcome yet").
4. Never force unsolicited advice or rigid taxonomies. Meet thoughts where they are.`;

    if (context?.openQuestions && context.openQuestions.length > 0) {
      prompt += `\n\nActive Open Questions in Memory:\n${context.openQuestions.map(q => `- ${q}`).join("\n")}`;
    }

    if (context?.recentThoughts && context.recentThoughts.length > 0) {
      prompt += `\n\nRecent Memory Context:\n${context.recentThoughts.map(t => `- [${t.recordedAt || "Recent"}] ${t.title || "Note"}: ${t.text || ""}`).join("\n")}`;
    }

    if (context?.matchedIdeas && context.matchedIdeas.length > 0) {
      prompt += `\n\nIdeas on Deck (Matched to Current Energy):\n${context.matchedIdeas.map(i => `- ${i.title}: ${i.reasoning}`).join("\n")}`;
    }

    return prompt;
  }

  /**
   * Streams a conversational sparring session
   */
  public async streamSparring(
    messages: SparringMessage[],
    context?: ThinkingPartnerContext,
    onToken?: (token: string) => void
  ): Promise<string> {
    const systemPrompt = this.buildSystemPrompt(context);

    const formattedMessages = messages.map((m) => ({
      role: m.role === "partner" ? ("assistant" as const) : m.role === "system" ? ("system" as const) : ("user" as const),
      content: m.content,
    }));

    let fullOutput = "";
    try {
      await this.ai.groq.streamReasoning(
        {
          systemPrompt,
          messages: formattedMessages,
          temperature: 0.7,
          maxTokens: 1500,
        },
        (token) => {
          fullOutput += token;
          if (onToken) onToken(token);
        }
      );
      return fullOutput;
    } catch (err) {
      console.warn("Groq sparring unavailable, generating grounded fallback:", err);
      let fallback = "I hear you. ";
      if (context?.matchedIdeas && context.matchedIdeas.length > 0) {
        fallback += `Looking at your current ${context.activeEnergyLevel || "active"} energy, the best project from your backlog is **${context.matchedIdeas[0].title}** (${context.matchedIdeas[0].reasoning.toLowerCase()}). `;
      }
      if (context?.openQuestions && context.openQuestions.length > 0) {
        fallback += `Also keep in mind your open question: "${context.openQuestions[0]}". `;
      }
      fallback += "Where would you like to take this next?";

      if (onToken) onToken(fallback);
      return fallback;
    }
  }

  /**
   * Synchronous sparring reply
   */
  public async reply(
    messages: SparringMessage[],
    context?: ThinkingPartnerContext
  ): Promise<string> {
    return this.streamSparring(messages, context);
  }
}
