# Technical Spec 00: Architecture Overview & Cloudflare Stack

> *"A custom, edge-native, sovereign cognitive backend built on the Cloudflare global network."*

---

## 1. System Architecture Overview

Qel's backend is completely custom—independent of monolithic BaaS platforms like Supabase. It is engineered as an **edge-native, distributed cognitive infrastructure** leveraging the Cloudflare developer ecosystem for ultra-low latency, zero egress fees, and globally distributed state.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                             CLIENT SURFACES                              │
│   Mobile App (React Native/NativeWind)  ·  Web App  ·  Browser Extension │
│                      Native Android Context Menu                         │
└────────────────────────────────────┬─────────────────────────────────────┘
                                     │ (HTTPS / WebSocket)
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                   CLOUDFLARE WORKERS API GATEWAY                         │
│               Routing · Auth & Scopes · Rate Limiting                    │
└──────┬──────────────────────┬──────────────────────┬─────────────────────┘
       │                      │                      │
       ▼                      ▼                      ▼
┌──────────────┐       ┌──────────────┐       ┌────────────────────────────┐
│ CLOUDFLARE   │       │ CLOUDFLARE   │       │ CLOUDFLARE DURABLE OBJECTS │
│ R2 STORAGE   │       │ QUEUES       │       │ • Live Session DO          │
│ • Raw Audio  │       │ • Ingest     │       │ • Cognitive Graph DO       │
│ • Images/Pins│       │ • Transcribe │       │ • Epistemic Matcher DO     │
│ • OCR Data   │       │ • Embed      │       │                            │
└──────────────┘       └──────┬───────┘       └──────────────┬─────────────┘
                              │                              │
                              ▼                              ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                      DATA & VECTOR RETRIEVAL LAYER                       │
│                                                                          │
│   ┌──────────────────────────────┐    ┌──────────────────────────────┐   │
│   │ CLOUDFLARE VECTORIZE         │    │ RELATIONAL & GRAPH STORAGE   │   │
│   │ • Text Semantic Vectors      │    │ • PostgreSQL (via Hyperdrive)│   │
│   │ • Visual Aesthetic Vectors   │    │   OR Cloudflare D1           │   │
│   │ • Prosody / State Vectors    │    │ • Relational Meta-Context    │   │
│   └──────────────────────────────┘    └──────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 2. The Cloudflare Tech Stack Matrix

| Cloudflare Primitive | Core Role in Qel | Key Technical Advantages |
|---|---|---|
| **Cloudflare Workers** | Edge API Gateway & Compute | Sub-millisecond cold starts, globally distributed compute close to the user, TypeScript native. |
| **Cloudflare R2** | Object Storage for Media & Audio | S3-compatible, **\$0 egress fees** (crucial for streaming 2 years of heavy voice audio and high-res Pinterest visual pins). |
| **Cloudflare Vectorize** | Edge Vector Database | Native integration with Workers, ultra-low latency top-K nearest neighbor search across semantic, aesthetic, and prosodic embeddings. |
| **Cloudflare Durable Objects** | Stateful Coordination & Realtime | Strongly consistent in-memory actors. Powers WebSocket streaming, active session state machines, and in-memory Cognitive Event Graph traversal. |
| **Cloudflare Queues** | Asynchronous Processing Pipeline | Decouples audio upload from heavy transcription, OCR, prosody extraction, and graph binding. Guarantees message delivery without timeouts. |
| **Cloudflare Hyperdrive / D1** | Relational & Graph Database | *Hyperdrive*: Pools and accelerates queries to PostgreSQL (for deep recursive graph queries and JSONB). *D1*: Native serverless SQLite at the edge for fast local caching. |
| **Cloudflare Workers AI** | Fast Edge Inferences | Lightweight text embeddings and fast edge classification. |

---

## 3. Database Architecture Decision: Postgres via Hyperdrive vs. D1

### Option A: PostgreSQL via Cloudflare Hyperdrive (Recommended for Cognitive Graph)
* **How it works**: A dedicated PostgreSQL instance (e.g. hosted on Neon, Supabase DB-only, or Oracle Cloud Free Tier) connected to Workers through **Cloudflare Hyperdrive**.
* **Why it wins for Qel**:
  1. **Complex Recursive Graph Queries**: Traversal of multi-hop causal links across years requires `WITH RECURSIVE` queries, which Postgres executes with immense efficiency.
  2. **Rich JSONB Querying**: Deep indexing and querying on the multi-layer `meta_context` envelope.
  3. **Hyperdrive Connection Pooling**: Eliminates standard Postgres connection exhaustion from serverless functions.

### Option B: Cloudflare D1 (Edge Native SQLite)
* **How it works**: Serverless SQLite databases running natively across Cloudflare's edge locations.
* **Best use in Qel**: Ideal for edge-replicated session logs, user preferences, and local client state synchronization.

---

## 4. Technical Spec Navigation

This technical knowledge base is organized by feature domain to allow targeted, iterative fine-tuning:

1. **[`01_INGESTION_AND_R2_PIPELINE.md`](file:///c:/Users/USER/StudioProjects/ogment_inc/qel/spec/technical/01_INGESTION_AND_R2_PIPELINE.md)** — R2 presigned URLs, Workers Queues, audio ingestion, Whisper transcription, and Pinterest scrapers.
2. **[`02_DATABASE_VECTORIZE_AND_SCHEMAS.md`](file:///c:/Users/USER/StudioProjects/ogment_inc/qel/spec/technical/02_DATABASE_VECTORIZE_AND_SCHEMAS.md)** — Relational PostgreSQL / D1 schemas, Vectorize index definitions, and JSONB envelopes.
3. **[`03_DURABLE_OBJECTS_AND_REALTIME.md`](file:///c:/Users/USER/StudioProjects/ogment_inc/qel/spec/technical/03_DURABLE_OBJECTS_AND_REALTIME.md)** — Session DO, WebSocket streaming, in-memory graph cache, and the Epistemic Void Matcher.
4. **[`04_COGNITIVE_GRAPH_AND_META_CONTEXT.md`](file:///c:/Users/USER/StudioProjects/ogment_inc/qel/spec/technical/04_COGNITIVE_GRAPH_AND_META_CONTEXT.md)** — Causal link extraction, precision scoring ($\Pi$), and spreading activation algorithms.
5. **[`05_CLIENT_UI_AND_EXTENSIONS.md`](file:///c:/Users/USER/StudioProjects/ogment_inc/qel/spec/technical/05_CLIENT_UI_AND_EXTENSIONS.md)** — Pure mymind masonry client architecture, mobile/web integration, browser extension, and Android context menu.
6. **[`06_EXECUTION_ROADMAP_AND_SPRINTS.md`](file:///c:/Users/USER/StudioProjects/ogment_inc/qel/spec/technical/06_EXECUTION_ROADMAP_AND_SPRINTS.md)** — Phased sprint-by-sprint development roadmap.
