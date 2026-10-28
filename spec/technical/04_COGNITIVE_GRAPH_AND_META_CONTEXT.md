# Technical Spec 04: Cognitive Graph Algorithms & Precision Engine

> *"Mathematical formulation of belief precision weights, spreading activation across the CEG, and emergent multi-scale narrative synthesis."*

---

## 1. The Epistemic Precision Weighting Algorithm ($\Pi$)

In Active Inference, belief precision $\Pi \in [0, 1]$ represents the inverse variance of an observation. In Qel, the overall precision of an assertion is computed hierarchically:

$$\Pi_{\text{total}} = w_1 \cdot \Pi_{\text{ground\_truth}} + w_2 \cdot \Pi_{\text{inference}} - w_3 \cdot \sum \text{Epistemic Voids}$$

```typescript
export interface MetaContextEnvelope {
  ground_truth_facts: Record<string, any>;     // Pi = 1.0 (Exact timestamp, verbatim audio text)
  high_confidence_signals: Record<string, any>;// Pi = 0.85 - 0.95 (Vocal prosody, OCR)
  probabilistic_inferences: Record<string, {
    confidence: number;
    evidence: string;
  }>;                                          // Pi = 0.30 - 0.60 (Inferred sleep debt)
  epistemic_voids: string[];                   // Missing variables (e.g. unverified sleep log)
}

export function computeEpistemicPosture(envelope: MetaContextEnvelope): "DIRECT_CONVICTION" | "CONTEXTUAL_HUMILITY" | "EPISTEMIC_CURIOSITY" {
  if (envelope.epistemic_voids.length > 2) {
    return "EPISTEMIC_CURIOSITY";
  }
  const avgInferenceConf = Object.values(envelope.probabilistic_inferences)
    .reduce((acc, curr) => acc + curr.confidence, 0) / (Object.keys(envelope.probabilistic_inferences).length || 1);

  return avgInferenceConf > 0.75 ? "DIRECT_CONVICTION" : "CONTEXTUAL_HUMILITY";
}
```

---

## 2. Spreading Activation Across the Cognitive Event Graph

When an artifact or concept $N_0$ is activated during conversational sparring, energy spreads through the graph with exponential distance decay:

$$A(N_i) = A(N_0) \cdot \sum_{j} (w_{ij} \cdot e^{-\lambda \cdot d(N_i, N_j)})$$

* $\lambda$: Temporal and conceptual decay factor.
* $w_{ij}$: Relational edge weight (e.g. `causal_precursor` = 1.0, `reinforces` = 0.8, `analogy` = 0.6).
* $d(N_i, N_j)$: Graph distance (hops).

### Graph Traversal Query (PostgreSQL CTE via Hyperdrive)
```sql
with recursive graph_activation as (
  -- Base Node
  select 
    target_artifact_id as node_id, 
    confidence_weight as activation_score, 
    1 as depth
  from causal_links
  where source_artifact_id = $1

  union all

  -- Recursive Expansion
  select 
    cl.target_artifact_id as node_id,
    (ga.activation_score * cl.confidence_weight * 0.75) as activation_score,
    ga.depth + 1
  from causal_links cl
  join graph_activation ga on cl.source_artifact_id = ga.node_id
  where ga.depth < 3 and (ga.activation_score * cl.confidence_weight) > 0.35
)
select distinct node_id, max(activation_score) as final_activation
from graph_activation
group by node_id
order by final_activation desc
limit 15;
```

---

## 3. The Multi-Scale Narrative Synthesis Engine

The synthesis pipeline produces three zoom levels of narrative reports using structured LLM system prompts:

| Scale | Temporal Window | Synthesis Prompt Directive |
|---|---|---|
| **Micro Arc** | Past 24–48 Hours | Focus strictly on immediate state, daily epiphanies, and active blockers. |
| **Meso Arc** | Past 30–90 Days | Identify cyclical patterns, habit loops, emotional trajectories, and project milestones. |
| **Macro Arc** | 1–3 Years (Full Archive) | Synthesize long-term personal philosophy evolution, major mindset shifts, and identity progression. |
