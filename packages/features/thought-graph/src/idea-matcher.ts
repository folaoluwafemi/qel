import { getDatabase, ideaBacklog } from "@qel/database";
import type { IdeaMatch } from "./types";

export class IdeaMatcher {
  /**
   * Evaluates backlog ideas and finds the best project to work on given the user's current energy state
   */
  public async matchIdeasForEnergy(
    energyLevel: "low" | "medium" | "high" = "medium",
    activeInterestKeywords: string[] = []
  ): Promise<IdeaMatch[]> {
    if (!process.env.DATABASE_URL) {
      return this.getMockIdeas(energyLevel);
    }

    const db = getDatabase();
    const ideas = await db.select().from(ideaBacklog);

    if (ideas.length === 0) {
      return this.getMockIdeas(energyLevel);
    }

    const matches: IdeaMatch[] = [];

    for (const idea of ideas) {
      let score = 0.5;
      let energyFit: "perfect" | "moderate" | "demanding" = "moderate";

      // Match energy requirements
      const profile = idea.energyProfile || "quick_vibe";
      if (energyLevel === "low") {
        if (profile === "light_exploration" || profile === "quick_vibe") {
          score += 0.35;
          energyFit = "perfect";
        } else {
          energyFit = "demanding";
        }
      } else if (energyLevel === "high") {
        if (profile === "deep_focus") {
          score += 0.35;
          energyFit = "perfect";
        } else {
          score += 0.15;
          energyFit = "moderate";
        }
      } else {
        score += 0.2;
        energyFit = "moderate";
      }

      // Keyword boost
      if (activeInterestKeywords.length > 0) {
        const text = `${idea.title} ${idea.rawPitch}`.toLowerCase();
        const matchesCount = activeInterestKeywords.filter(kw => text.includes(kw.toLowerCase())).length;
        score += Math.min(0.25, matchesCount * 0.08);
      }

      matches.push({
        ideaId: idea.id,
        title: idea.title,
        summary: idea.rawPitch ? idea.rawPitch.slice(0, 160) + "..." : undefined,
        matchScore: Number(Math.min(0.98, score).toFixed(2)),
        energyFit,
        reasoning: energyFit === "perfect"
          ? `Ideal fit for your ${energyLevel} energy window right now.`
          : `Can be tackled if you want a ${energyFit} challenge.`,
        suggestedNextStep: "Open a canvas scratchpad or generate a 1-page spec with your thinking partner.",
      });
    }

    return matches.sort((a, b) => b.matchScore - a.matchScore);
  }

  private getMockIdeas(energyLevel: string): IdeaMatch[] {
    return [
      {
        ideaId: "idea-1",
        title: "Spatial Audio Memo Player",
        summary: "Visual waveform player with clickable timestamps and pitch extraction.",
        matchScore: energyLevel === "high" ? 0.94 : 0.78,
        energyFit: energyLevel === "high" ? "perfect" : "demanding",
        reasoning: "High leverage creative tool aligned with your voice archive.",
        suggestedNextStep: "Wire up the waveform canvas component.",
      },
      {
        ideaId: "idea-2",
        title: "Minimalist Palette Browser",
        summary: "Extract 4-color hex palettes from Pinterest pins and export to Tailwind tokens.",
        matchScore: energyLevel === "low" ? 0.91 : 0.82,
        energyFit: energyLevel === "low" ? "perfect" : "moderate",
        reasoning: "Low-friction, visually satisfying build for lower energy sessions.",
        suggestedNextStep: "Test the 4-color extractor on 5 recent pins.",
      },
      {
        ideaId: "idea-3",
        title: "Telegram Quick-Capture Bot",
        summary: "Forward voice memos or links directly to your Qel stream via webhook.",
        matchScore: 0.85,
        energyFit: "moderate",
        reasoning: "Practical bridge for mobile capture when away from desktop.",
        suggestedNextStep: "Register a Telegram bot token via BotFather.",
      }
    ];
  }
}
