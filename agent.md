# Qel: AI Agent Development Guidelines & System Architecture

> **Notice to AI Agents**: This document defines the engineering standards, architectural boundaries, design token requirements, and coding conventions for the Qel codebase. All code written must strictly adhere to these directives.

---

## 1. System Philosophy & Ground Rules

1. **Mission**: To 100x human innovation on a person-by-person basis by bridging thought, reflection, and execution.
2. **First-Principles Agency**: Never treat notes as static text. Every artifact is a living checkpoint wrapped in a **Meta-Context Envelope** with explicit belief precision ($\Pi$).
3. **No Monolithic BaaS**: Qel uses a custom, edge-native backend on **Cloudflare** (Workers, R2, Vectorize, Durable Objects, Queues) and PostgreSQL (via Hyperdrive). **Do NOT import or use Supabase clients/APIs**.
4. **Pure `mymind` Experience**: The UI must enforce *"Remember everything, organize nothing"*. No manual folder hierarchies, no forced categories. The visual stream is an infinite masonry grid of raw cards.
5. **Package Management**: Always use **`pnpm`** for dependency management.

---

## 2. Directory & Architecture Layout (Lean Clean Architecture)

```
qel/
├── apps/
│   ├── api/                 # Cloudflare Workers API Gateway & Router
│   ├── workers/             # Cloudflare Queues workers (ingest, transcribe, ocr)
│   ├── durable-objects/     # LiveSessionDO, CanvasSpaceDO, EpistemicVoidMatcherDO
│   ├── mobile/              # React Native / Expo (SDK 52+) + NativeWind v4
│   ├── web/                 # Next.js Web Client & Masonry Stream
│   └── extension/           # Browser Extension (Manifest V3 + Excalidraw Canvas)
├── packages/
│   ├── core/                # Shared business logic, schemas, and domain types
│   ├── design-system/       # NativeWind & Tailwind tokens, Ds* atomic components
│   ├── ai-router/           # Multi-modal model connectors (Groq, Gemini, SigLIP)
│   └── cognitive-graph/     # CEG traversal, spreading activation, precision engine
├── spec/                    # Knowledge base specifications (Core, Features, Tech)
├── DESIGN.md                # Design system tokens (Resend + Mintlify hybrid)
└── about.md                 # System manifesto & overview
```

---

## 3. Design System & Token Conventions

All UI components must strictly adhere to the unified **Resend + Mintlify** design token system defined in [`DESIGN.md`](file:///c:/Users/USER/StudioProjects/ogment_inc/qel/DESIGN.md):

* **Typography Tokens**:
  * **Display / Headings**: `font-serif` mapped to **Arizona Flare** (Mintlify's signature editorial serif font).
  * **Body & UI**: `font-sans` mapped to **Geist / Inter** (`ss01, ss04, ss11` features).
  * **Code & Telemetry**: `font-mono` mapped to **Geist Mono**.
* **Color Palette Tokens**:
  * Canvas / Base Dark: `bg-canvas` (`#111318` / `#000000`)
  * Surface Card: `bg-surface-card` (`#0a0a0c` / `#121212`)
  * Elevated Surface: `bg-surface-elevated` (`#101012`)
  * Primary Accent: `text-accent-orange` / `bg-accent-orange` (`#FF4D00` / `#ff801f`)
  * Secondary Accent: `text-accent-coral` (`#FF8360`)
  * Hairline Borders: `border-hairline` (`rgba(255, 255, 255, 0.06)`)
  * Light Background: `bg-canvas-light` (`#F7F7F9`)
* **Styling Rules**:
  * Use **NativeWind v4** semantic classes.
  * **No inline styles** and **no `StyleSheet.create`** for visual styling.
  * Always account for Safe Areas on mobile using `SafeAreaView` or `useSafeAreaInsets`.

---

## 4. Multi-Modal AI Model Routing Standards

When implementing AI capabilities, route requests through `packages/ai-router` according to this tiering:

| Capability | Assigned Frontier Model | Justification |
|---|---|---|
| **Audio Transcription** | **Groq Whisper Large v3** / **Deepgram Nova-2** | Sub-second, ultra-fast 200x realtime transcription. |
| **Prosody & Fatigue Extraction** | **Gemini 2.5 Flash** (Multimodal Audio) | Directly processes `.m4a` audio to extract pitch variance, vocal energy, and epiphanies. |
| **Visual Embeddings** | **SigLIP** (Google) / **OpenCLIP ViT-G/14** | 768-d multi-modal visual embeddings for Cloudflare Vectorize. |
| **Image Analysis & OCR** | **Gemini 2.5 Flash** / **Claude 3.5 Sonnet** | High-precision palette extraction and screenshot OCR. |
| **Semantic Text Embeddings** | **OpenAI `text-embedding-3-small`** (1536-d) | High-resolution semantic retrieval in Cloudflare Vectorize. |
| **Cognitive Sparring & Narrative** | **Gemini 3.7 Flash** (Reasoning) / **Claude 3.7 Sonnet** | Deep longitudinal reasoning, multi-scale narratives, and live sparring via `LiveSessionDO`. |

---

## 5. Epistemic Precision & Cognitive Graph Directives

1. **Meta-Context Integrity**: Every ingested artifact must have a corresponding `meta_context_envelope` record separating:
   * `ground_truth_facts` ($\Pi = 1.0$)
   * `high_confidence_signals` ($\Pi \approx 0.9$)
   * `probabilistic_inferences` ($\Pi \approx 0.4$)
   * `epistemic_voids` (Missing data sockets)
2. **Never Assert False Certainty**: If a sleep log is unverified, the AI must qualify its output: *"I notice this was recorded at 2:34 AM with notable vocal fatigue; while sleep logs are absent, historical patterns suggest..."*
3. **Asynchronous Void Resolution**: When a new checkpoint is ingested, `EpistemicVoidMatcherDO` must scan `epistemic_void_index` to automatically resolve open dangling sockets without interrupting the user.

---

## 6. Coding Standards & Conventions

* **Language**: Strict TypeScript (`strict: true`, no `any`).
* **Zero-Waste Refactoring**: Never leave dead code, orphaned imports, or placeholder comments.
* **Single Responsibility**: Keep functions small, modular, and testable.
* **State Management**: Use **Zustand** with `useShallow` selectors to prevent unnecessary re-renders in React / React Native.
* **Error Handling**: Graceful error boundaries and human-readable error messages for all edge functions.
