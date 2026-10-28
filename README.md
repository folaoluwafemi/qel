# Qel

**Knowledge meets agency. The Personal Cognitive OS & Sovereign Thinking Partner.**

To 100x the innovative and generative capability of the human species on a person-by-person basis.

---

## What is Qel?

Qel is an edge-native cognitive operating system that captures your unconstrained multi-modal exhaust (2-year voice journals with acoustic prosody, Pinterest visual taste, web clippings, and project backlogs), constructs an associative **Cognitive Event Graph (CEG)**, and acts as a sovereign sparring partner to help you think, reflect, and build in real time.

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

## Core Capabilities

1. **Omni-Modal Ingestion**:
   - **Voice Journals**: 2-year backlog backfill + daily quick drops with **acoustic prosody metrics** (speech rate WPM, vocal fatigue index, circadian nadir detection).
   - **Pinterest & Visual Inspo**: Native visual scraping, 4-color palette extraction, SigLIP visual embeddings, and OCR text recognition.
   - **Browser Extension & Infinite Canvas**: Hybrid of **Raindrop + Milanote + Excalidraw** with configurable New Tab page, `Cmd+Shift+S` omni-capture dock, and 2D freehand/connector spatial workspace.
   - **Android Native OS Menus**: System-wide text selection menu (`ACTION_PROCESS_TEXT` $\rightarrow$ "Send to Qel") and universal Share Sheet target (`ACTION_SEND`).
2. **Pure `mymind` Visual Experience**:
   - *"Remember everything, organize nothing"*: Zero folders, zero manual filing anxiety.
   - Infinite virtualized masonry grid with interactive audio waveform cards, reading mode articles, and visual pins.
   - Smart Spaces as dynamic living queries and Serendipity resurfacing.
3. **Cognitive Event Graph & Epistemic Precision**:
   - **Meta-Context Envelopes**: Delineates Ground Truth ($\Pi=1.0$), High-Confidence Inferences ($\Pi\approx0.9$), Probabilistic Hypotheses ($\Pi\approx0.4$), and Epistemic Voids.
   - **Asynchronous Void Resolution**: Missing data sockets are resolved silently across time when future checkpoints arrive, eliminating curiosity fatigue.

---

## System Architecture

* **Backend**: Custom Cloudflare-native stack (Workers, R2 object storage, Vectorize edge database, Durable Objects for realtime WebSocket streaming and canvas CRDT sync, Workers Queues).
* **Database**: PostgreSQL accelerated via Cloudflare Hyperdrive connection pooling.
* **Client**: React Native / Expo (SDK 52+) + NativeWind v4 (iOS/Android), Next.js (Web), and Manifest V3 (Browser Extension).
* **Package Management**: `pnpm`.

---

## Design System & Typography

The design system combines **Resend's precision developer aesthetic** with **Mintlify's editorial warmth**:

| Element | Value |
|---|---|
| **Editorial / Header Font** | **Arizona Flare** (Mintlify signature header font) |
| **Body & UI Font** | **Geist / Inter** |
| **Code & Telemetry Font** | **Geist Mono** |
| **Canvas / Base Dark** | `#111318` / `#000000` (Graphite inky depth) |
| **Primary Accent** | `#FF4D00` (Fiery Orange-Red) |
| **Secondary Accent** | `#FF8360` (Soft Coral) |
| **Canvas Light** | `#F7F7F9` (Very Light Gray) |

See [`DESIGN.md`](DESIGN.md) for full design token specifications.

---

## Documentation & Knowledge Base

- **[System Manifesto & Overview](about.md)**
- **[Agent Guidelines & System Architecture](agent.md)**
- **[Design System Specification](DESIGN.md)**
- **[Master Specification Matrix](spec/00_MASTER_INDEX.md)**
  - **Core Concepts**: [`01_FOUNDATIONAL_PHILOSOPHY_AND_AGENCY.md`](spec/01_FOUNDATIONAL_PHILOSOPHY_AND_AGENCY.md) · [`05_PROACTIVE_AGENCY_AND_STATE_DISTORTION.md`](spec/05_PROACTIVE_AGENCY_AND_STATE_DISTORTION.md)
  - **Feature Blueprints**: [`01_BROWSER_EXTENSION_AND_INFINITE_CANVAS.md`](spec/features/01_BROWSER_EXTENSION_AND_INFINITE_CANVAS.md) · [`02_VOICE_JOURNAL_AND_ACOUSTIC_PROSODY.md`](spec/features/02_VOICE_JOURNAL_AND_ACOUSTIC_PROSODY.md) · [`03_VISUAL_STREAM_AND_MYMIND_EXPERIENCE.md`](spec/features/03_VISUAL_STREAM_AND_MYMIND_EXPERIENCE.md)
  - **Technical Specs**: [`00_TECH_INDEX_AND_ARCHITECTURE.md`](spec/technical/00_TECH_INDEX_AND_ARCHITECTURE.md) · [`02_DATABASE_VECTORIZE_AND_SCHEMAS.md`](spec/technical/02_DATABASE_VECTORIZE_AND_SCHEMAS.md) · [`03_DURABLE_OBJECTS_AND_REALTIME.md`](spec/technical/03_DURABLE_OBJECTS_AND_REALTIME.md)