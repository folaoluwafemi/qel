export type EpistemicPosture = 
  | "DIRECT_CONVICTION"    // Ground truth verified / high confidence
  | "CONTEXTUAL_HUMILITY"   // Inferred / probabilistic signals present
  | "EPISTEMIC_CURIOSITY";  // Significant missing data / active open void

export interface GroundTruthFacts {
  recordingTimeLocal?: string;
  audioDurationSeconds?: number;
  explicitQuotes?: string[];
  sourceDomain?: string;
  imageDimensions?: { width: number; height: number };
  [key: string]: any;
}

export interface HighConfidenceSignals {
  vocalEnergyLevel?: number;   // 0.0 to 1.0
  speechRateWpm?: number;      // Words per minute
  circadianPhase?: string;     // e.g. "biological_nadir", "morning_peak"
  ocrConfidence?: number;
  [key: string]: any;
}

export interface ProbabilisticInference {
  confidence: number;          // 0.0 to 1.0
  evidence: string;
  matchedEpisodeId?: string;
}

export interface MetaContextEnvelope {
  id: string;
  artifactId: string;
  groundTruthFacts: GroundTruthFacts;
  highConfidenceSignals: HighConfidenceSignals;
  probabilisticInferences: Record<string, ProbabilisticInference>;
  epistemicVoids: string[];
  overallPrecisionScore: number; // 0.0 to 1.0
  createdAt: string;
}

export type EpistemicVoidStatus = "open" | "resolved" | "expired";

export interface EpistemicVoid {
  id: string;
  sourceArtifactId: string;
  voidDescription: string;
  requiredModality?: string;
  status: EpistemicVoidStatus;
  resolvedByArtifactId?: string;
  resolutionNotes?: string;
  resolvedAt?: string;
  createdAt: string;
}
