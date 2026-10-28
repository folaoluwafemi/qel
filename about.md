# Qel: About

> **"To 100x the innovative and generative capability of the human species on a person-by-person basis."**

---

## What is Qel?

**Qel** is a **Personal Cognitive Operating System and Sovereign Thinking Partner**. 

We don't trust our memory, so we write things down. But today, our digital lives are fragmented across unconstrained 20-minute voice memos, Pinterest visual boards, scattered notes, browser bookmarks, and WhatsApp chats. When inspiration strikes, our best ideas die in the **"Distance to Action"**—stalled by the cognitive fatigue of manual organizing, sifting, and planning.

Qel closes the loop between **Observation, Reasoning, Execution, and Measurement**.

It ingests your unconstrained multi-modal exhaust (voice journals with acoustic prosody, visual taste from Pinterest, web clippings, and idea backlogs), constructs a longitudinal **Cognitive Event Graph (CEG)**, and acts as an active sparring partner that knows who you are, understands your aesthetic taste, and helps you think, decide, and build in real time.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                             THE FOUR LAYERS                              │
├──────────────────────────────────────────────────────────────────────────┤
│ LAYER 4: EMERGENT CO-CREATION & AGENCY                                   │
│ Live conversational sparring, backlog triage, and vibe-coding scaffolding│
├──────────────────────────────────────────────────────────────────────────┤
│ LAYER 3: SPATIAL CANVAS & PURE mymind STREAM                             │
│ Infinite 2D Thinking Canvas (Excalidraw/Milanote) + Serene Masonry Stream│
├──────────────────────────────────────────────────────────────────────────┤
│ LAYER 2: COGNITIVE OS & ASYNCHRONOUS GRAPH                               │
│ Active Inference, Meta-Context Envelopes, and Epistemic Void Resolution  │
├──────────────────────────────────────────────────────────────────────────┤
│ LAYER 1: SENSORY INGESTION & CLOUDFLARE EDGE                             │
│ 2-Year Voice Memos, Pinterest Scrapers, Browser Ext., Android Context Menu│
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Defining Agency from First Principles

In standard software, AI is a stateless instruction-follower. In Qel, **Agency** is defined as:
> **The capacity of an individual to express their intent to effect change in the world and in themselves generatively.**

* **Express Intent**: Absorbing raw, messy, unpolished thoughts (voice notes, visual pins) where they are without forcing structured formatting.
* **Effect Change in Oneself**: Metacognition, growth, breaking recurring behavioral loops, and distinguishing acute physiological fatigue from existential or relational crises.
* **Effect Change in the World**: Conversational sparring, ideation, and rapid execution (e.g. one-shot vibe-coding with modern frontier models).
* **Generatively**: Unlocking emergent cross-domain insights and creative trajectories that were not explicitly planned.

---

## Core Pillars of the System

### 1. The Multi-Modal Sensory Ingestion Spectrum
* **Voice Journaling (The Acoustic Stream)**: Ingesting a 2-year backlog of voice memos and daily instant voice drops. Extracts verbatim text alongside **acoustic prosody metrics** (speech rate WPM, pause density, vocal fatigue, and circadian nadir markers).
* **Visual & Aesthetic Stream (Pinterest)**: Ingesting Pinterest boards and visual pins to extract **Taste Archetypes**, dominant color palettes, and OCR text, linking visual aesthetics directly to conceptual project ideas.
* **Browser Extension & Infinite Canvas**: A hybrid of **Raindrop, Milanote, and Excalidraw**. Features a configurable New Tab page, a one-shortcut omni-capture dock (`Cmd+Shift+S`), and an infinite 2D spatial canvas for arranging cards, notes, and freehand sketches.
* **Android Native OS Integration**: System-wide text selection menu (`ACTION_PROCESS_TEXT` $\rightarrow$ "Send to Qel") and universal Share Sheet target (`ACTION_SEND`) for zero-friction mobile capture.
* **Creative Idea Backlog**: Triage of 17+ raw project concepts matched to your visual taste, energy vector, and new frontier AI releases.

### 2. The Pure mymind Visual Experience
* **"Remember everything, organize nothing"**: Zero folders, zero manual filing, and zero tagging anxiety.
* **Infinite Masonry Stream**: Visual cards displaying audio waveforms with pull quotes, Pinterest pins with color palettes, distraction-free **Reading Mode** web articles, and clean typography notes.
* **Smart Spaces as Living Queries**: Dynamic, automated collections that assemble matching context on the fly.
* **Serendipity Resurfacing**: Gentle rediscovery of forgotten past epiphanies to spark subconscious creative connections.

### 3. The Science of Narrative Synthesis & Epistemic Precision
* **Hierarchical Decomposition**: Checkpoints are structured into Levels (Sensory Atoms $\rightarrow$ Entities $\rightarrow$ Sub-Elements & Premises $\rightarrow$ Narrative Episodes $\rightarrow$ Macro Life Arcs).
* **The Meta-Context Envelope**: Every artifact delineates **Ground Truth Facts ($\Pi = 1.0$)**, **High-Confidence Inferences ($\Pi \approx 0.9$)**, **Probabilistic Hypotheses ($\Pi \approx 0.4$)**, and **Open Epistemic Voids**.
* **Asynchronous Epistemic Void Resolution**: To prevent curiosity fatigue, the system does not interrogate the user for every missing detail. Open voids are stored as "dangling sockets" and retroactively resolved when future checkpoints arrive.
* **Emergent Reliability**: Active Inference precision-weighting ensures the AI naturally scales its conviction and humility without brittle hardcoded rules.

---

## The Technical Infrastructure

* **Edge Compute & API**: Cloudflare Workers (sub-millisecond cold starts, globally distributed).
* **Object Storage**: Cloudflare R2 (S3-compatible, **\$0 egress fees** for voice audio and visual media).
* **Vector Database**: Cloudflare Vectorize (`qel-semantic-index` 1536-d, `qel-visual-index` 768-d).
* **Realtime & In-Memory State**: Cloudflare Durable Objects (`LiveSessionDO` WebSocket streaming, `CanvasSpaceDO` CRDT sync, `EpistemicVoidMatcherDO`).
* **Asynchronous Queues**: Cloudflare Queues for decoupled transcription, OCR, and prosody extraction.
* **Relational & Graph Storage**: PostgreSQL accelerated via Cloudflare Hyperdrive connection pooling.
* **Multi-Modal AI Stack**: Groq Whisper / Deepgram + Gemini 2.5 Flash (Audio & Prosody) + SigLIP (Visual Embeddings) + Gemini 3.7 Flash / Claude 3.7 Sonnet (Longitudinal Reasoning & Sparring).

---

## Design System & Aesthetic Identity

* **Visual Vibe**: Resend precision developer aesthetic combined with Mintlify editorial warmth.
* **Typography**:
  * **Header / Editorial**: **Arizona Flare** (Mintlify's iconic editorial serif/flare font).
  * **Body & UI**: **Geist / Inter**.
  * **Code & Telemetry**: **Geist Mono**.
* **Color Palette**:
  * **Graphite Canvas**: `#111318` / `#000000` (Dark, structural, inky depth).
  * **Fiery Orange Accent**: `#FF4D00` (Energy, epiphanies, actionable moments).
  * **Soft Coral**: `#FF8360` (Subtle highlights, notifications).
  * **Light Neutral**: `#F7F7F9` (Airy, clean canvas).
