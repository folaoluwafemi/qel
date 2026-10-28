export type CausalRelationType =
  | "causal_precursor"      // Event A triggered Epiphany B
  | "reinforces"            // Pattern in A reinforces pattern in B
  | "contradicts"           // B disproves or updates A
  | "cross_domain_analogy"  // Analogy across disparate domains
  | "emergent_convergence"; // Multiple streams converging to new thesis

export interface CausalLink {
  id: string;
  sourceArtifactId: string;
  targetArtifactId: string;
  relationType: CausalRelationType;
  confidenceWeight: number; // 0.0 to 1.0
  synthesizedReasoning?: string;
  createdAt: string;
}

export interface ActivatedGraphNode {
  nodeId: string;
  activationScore: number;
  depth: number;
  sourceArtifactTitle?: string;
}
