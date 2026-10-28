# Technical Spec 02: Database Schemas & Cloudflare Vectorize

> *"Complete relational schemas and Vectorize edge index definitions for multi-modal storage, meta-context envelopes, and graph edges."*

---

## 1. Cloudflare Vectorize Index Configuration

Cloudflare Vectorize indexes store vector embeddings directly on Cloudflare's edge network, enabling sub-10ms nearest neighbor queries within Workers.

```typescript
// wrangler.toml vectorize bindings
[[vectorize]]
binding = "SEMANTIC_INDEX"
index_name = "qel-semantic-index" // 1536-d (Text & Audio Transcripts)

[[vectorize]]
binding = "VISUAL_INDEX"
index_name = "qel-visual-index"   // 768-d (Pinterest Pins & Screenshots)
```

| Index Name | Dimensions | Distance Metric | Content Indexed |
|---|---|---|---|
| `qel-semantic-index` | 1536 | Cosine | Transcripts of voice memos, notes, web clippings, and epiphanies. |
| `qel-visual-index` | 768 | Cosine | SigLIP / CLIP embeddings of Pinterest images, mood boards, and screenshots. |

---

## 2. Relational Database Schema (PostgreSQL via Hyperdrive / D1)

```sql
-- 1. Artifacts (The Core Visual Container - mymind style)
create table artifacts (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  created_at timestamptz not null default now(),
  recorded_at timestamptz not null,
  modality text not null check (modality in (
    'voice_memo', 'visual_pin', 'raw_image', 'raw_video', 'video_bookmark',
    'web_clipping', 'raw_note', 'canvas_board', 'code_snippet', 'pdf_document'
  )),
  
  -- Raw Content & Storage Pointers
  title text,
  raw_text text,
  r2_media_key text,           -- Points to Cloudflare R2 object
  r2_media_url text,
  source_url text,
  
  -- mymind Visual & Canvas Metadata
  dominant_colors text[],      -- e.g. ['#111318', '#FF4D00', '#F7F7F9']
  ocr_extracted_text text,
  reading_mode_html text,      -- Stripped, clean readability HTML
  canvas_scene_json jsonb,     -- Excalidraw / Milanote spatial vector scene
  auto_tags text[],            -- AI auto-generated tags
  
  vector_id text               -- Reference ID in Cloudflare Vectorize
);

-- 2. Meta-Context Envelopes (Epistemic Precision Layer)
create table meta_context_envelopes (
  id uuid primary key default gen_random_uuid(),
  artifact_id uuid not null references artifacts(id) on delete cascade,
  
  -- Structured JSONB Envelope
  ground_truth_facts jsonb not null default '{}',
  high_confidence_signals jsonb not null default '{}',
  probabilistic_inferences jsonb not null default '{}',
  epistemic_voids text[] not null default '{}',
  
  -- Precision & Confidence Weight (0.0 to 1.0)
  overall_precision_score float not null default 1.0,
  created_at timestamptz not null default now()
);

-- 3. Epistemic Void Index (Dangling Causal Sockets)
create table epistemic_void_index (
  id uuid primary key default gen_random_uuid(),
  source_artifact_id uuid not null references artifacts(id) on delete cascade,
  void_description text not null,
  required_modality text,       -- e.g. 'morning_audio', 'sleep_log'
  status text not null default 'open' check (status in ('open', 'resolved', 'expired')),
  
  -- Temporal Resolution Metadata
  resolved_by_artifact_id uuid references artifacts(id),
  resolution_notes text,
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

-- 4. Cognitive Event Graph (Causal & Relational Links)
create table causal_links (
  id uuid primary key default gen_random_uuid(),
  source_artifact_id uuid not null references artifacts(id) on delete cascade,
  target_artifact_id uuid not null references artifacts(id) on delete cascade,
  
  relation_type text not null check (relation_type in (
    'causal_precursor',    -- Event A triggered Epiphany B
    'reinforces',          -- Pattern in A reinforces pattern in B
    'contradicts',         -- B disproves or updates A
    'cross_domain_analogy',-- Analogy between unrelated fields
    'emergent_convergence' -- Multiple streams converging to new thesis
  )),
  confidence_weight float not null default 0.8,
  synthesized_reasoning text,
  created_at timestamptz not null default now()
);

-- 5. Smart Spaces (Living Dynamic Queries)
create table smart_spaces (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  name text not null,
  icon text,
  living_query jsonb not null,  -- Filter rules: { tags: [], colors: [], text_query: "", date_range: {} }
  created_at timestamptz not null default now()
);

-- 6. Creative Idea Backlog
create table idea_backlog (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  title text not null,
  raw_pitch text not null,
  aesthetic_pin_ids uuid[],     -- Foreign keys to visual_pin artifacts
  energy_profile text check (energy_profile in ('deep_focus', 'quick_vibe', 'light_exploration')),
  target_frontier_model text,   -- e.g. 'gemini-3.7-flash', 'claude-3.7-sonnet'
  status text default 'backlog' check (status in ('backlog', 'active_sparring', 'scaffolded', 'archived')),
  created_at timestamptz not null default now()
);
```
