/**
 * Clean domain types for the Thought Graph and Thinking Partner.
 * Simplified from academic jargon to intuitive, practical concepts.
 */

export type CircadianPhase = 
  | "late_night_nadir" // 1:00 AM - 5:00 AM: high fatigue risk, emotional vulnerability
  | "morning_peak"     // 8:00 AM - 12:00 PM: high executive focus
  | "afternoon_dip"    // 1:00 PM - 4:00 PM: reflective, wandering
  | "evening_creative";// 7:00 PM - 11:00 PM: generative, divergent ideation

export interface ThoughtFact {
  key: string;
  value: string | number | boolean;
  confidence: 1.0; // Clear, verified ground truth
}

export interface ThoughtInference {
  label: string;
  detail: string;
  confidence: number; // 0.0 to 0.95
}

export interface OpenQuestion {
  id: string;
  sourceArtifactId: string;
  question: string;
  status: "open" | "resolved" | "expired";
  resolvedByArtifactId?: string;
  resolutionNotes?: string;
  resolvedAt?: string;
  createdAt: string;
}

export interface ThoughtContext {
  id: string;
  artifactId: string;
  circadianPhase: CircadianPhase;
  facts: ThoughtFact[];
  inferences: ThoughtInference[];
  openQuestions: string[];
  overallConfidence: number; // 0.0 to 1.0
  createdAt: string;
}

export type ThoughtRelation = 
  | "lead_up_to"       // This thought or event directly led to a breakthrough
  | "reinforces"       // Confirms a recurring observation or belief
  | "contradicts"      // Updates or disproves an older assumption
  | "analogy"          // Cross-domain parallel (e.g. software architecture <-> personal habit)
  | "synthesis";       // Convergence of multiple ideas into a new concept

export interface ThoughtLink {
  id: string;
  fromThoughtId: string;
  toThoughtId: string;
  relation: ThoughtRelation;
  confidence: number;
  reasoning?: string;
  createdAt: string;
}

export interface ConnectedThought {
  thoughtId: string;
  title: string;
  modality: string;
  snippet?: string;
  relation: ThoughtRelation;
  relevanceScore: number;
  timeDiffDays: number;
}

export interface IdeaMatch {
  ideaId: string;
  title: string;
  summary?: string;
  matchScore: number; // 0.0 to 1.0
  energyFit: "perfect" | "moderate" | "demanding";
  reasoning: string;
  suggestedNextStep?: string;
}

export interface SparringMessage {
  role: "user" | "partner" | "system";
  content: string;
  timestamp?: string;
  referencedThoughtIds?: string[];
  openQuestionResolved?: string;
}
