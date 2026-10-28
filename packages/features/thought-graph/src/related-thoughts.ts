import { getDatabase, causalLinks, artifacts } from "@qel/database";
import { eq, or, desc } from "drizzle-orm";
import type { ConnectedThought, ThoughtRelation } from "./types";

export class RelatedThoughtsEngine {
  /**
   * Finds all thoughts linked to a focal thought, sorted by temporal decay and relevance
   */
  public async getConnectedThoughts(
    focalArtifactId: string,
    limit: number = 6
  ): Promise<ConnectedThought[]> {
    if (!process.env.DATABASE_URL) {
      return [];
    }

    const db = getDatabase();

    // 1. Fetch links where the focal artifact is either source or target
    const links = await db
      .select()
      .from(causalLinks)
      .where(
        or(
          eq(causalLinks.sourceArtifactId, focalArtifactId),
          eq(causalLinks.targetArtifactId, focalArtifactId)
        )
      )
      .limit(limit * 2);

    if (links.length === 0) return [];

    const connectedResults: ConnectedThought[] = [];

    for (const link of links) {
      const otherId = link.sourceArtifactId === focalArtifactId 
        ? link.targetArtifactId 
        : link.sourceArtifactId;

      const [otherArtifact] = await db
        .select()
        .from(artifacts)
        .where(eq(artifacts.id, otherId))
        .limit(1);

      if (!otherArtifact) continue;

      // Calculate temporal distance in days
      const focalDate = otherArtifact.recordedAt ? new Date(otherArtifact.recordedAt).getTime() : Date.now();
      const diffDays = Math.max(0, Math.round(Math.abs(Date.now() - focalDate) / (1000 * 60 * 60 * 24)));

      // Exponential decay with half-life of ~90 days (lambda = 0.0077)
      const temporalDecay = Math.exp(-0.0077 * diffDays);
      const score = link.confidenceWeight * (0.6 + 0.4 * temporalDecay);

      connectedResults.push({
        thoughtId: otherArtifact.id,
        title: otherArtifact.title || "Untitled Thought",
        modality: otherArtifact.modality,
        snippet: otherArtifact.rawText ? otherArtifact.rawText.slice(0, 140) + "..." : undefined,
        relation: this.mapRelation(link.relationType),
        relevanceScore: Number(score.toFixed(2)),
        timeDiffDays: diffDays,
      });
    }

    // Sort by relevance score descending
    return connectedResults
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);
  }

  private mapRelation(rawRelation: string): ThoughtRelation {
    switch (rawRelation) {
      case "causal_precursor":
        return "lead_up_to";
      case "reinforces":
        return "reinforces";
      case "contradicts":
        return "contradicts";
      case "cross_domain_analogy":
        return "analogy";
      case "emergent_convergence":
        return "synthesis";
      default:
        return "reinforces";
    }
  }
}
