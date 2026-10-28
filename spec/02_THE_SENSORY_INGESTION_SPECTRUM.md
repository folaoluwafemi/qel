# 02. The Sensory Ingestion Spectrum & Checkpoint Modalities

> *"Any and every way to consume digital context when it happens — low-friction capture across the full spectrum of conscious experience."*

---

## 1. The Ingestion Philosophy: Zero-Friction Checkpoints

A "Checkpoint" is any discrete capture of human intent, reaction, aesthetic discovery, or state of mind. Capture must demand **near-zero activation energy**. If saving a thought or reference requires opening a heavy app, picking a folder, and typing three tags, the thought is lost.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                      THE CONTINUOUS SENSORY SPECTRUM                     │
├──────────────────────────┬───────────────────────────┬───────────────────┤
│ AUDITORY CONSCIOUSNESS   │ VISUAL & AESTHETIC TASTE  │ DIGITAL EXHAUST   │
│ • 2-Year Voice Memos     │ • Pinterest Boards        │ • Browser Ext.    │
│ • Realtime Voice Drops   │ • Screenshots & Images    │ • Android Menu    │
│ • Prosody & Acoustic Tone│ • Design Inspiration      │ • Raw Backlog     │
└──────────────────────────┴───────────────────────────┴───────────────────┘
```

---

## 2. Ingestion Modality Matrix (The Living Checklist)

To accommodate iterative engineering and resource scaling, capture modalities are categorized into an actionable checklist prioritized by cognitive leverage and implementation cost:

| Modality / Channel | Cognitive Yield | Implementation Priority | Description & Technical Scope |
|---|---|---|---|
| **Voice Journaling (Audio Stream)** | High (Raw Mind) | **P0 (Immediate)** | Ingestion of 2-year voice memo archive + daily instant voice drops. Extracts text, prosody, emotional tone, pace, and vocal fatigue. |
| **Browser Extension** | High (Web Context) | **P0 (Immediate)** | Highlight text or click on any webpage -> "Save to Qel" with optional user annotation (*"I like this because X"*). Scrapes page context and links it to active thoughts. |
| **Android System Context Menu & Share Sheet** | High (Mobile OS) | **P0 (Immediate)** | Native OS-level text selection menu ("Send to Qel") and Share Sheet target. Zero-app-switch capture from any mobile application. |
| **Pinterest Native Scraping & Taste Embedder** | High (Latent Taste) | **P0 (Immediate)** | Direct ingestion of Pinterest boards, visual pins, and descriptions to model subconscious aesthetic preferences, lifestyle goals, and visual identity. |
| **Creative Idea Backlog (Raw Text & Idea Dumps)** | High (Execution) | **P0 (Immediate)** | Batch paste / import of the 17+ raw project concepts and specs. Unstructured ingestion without forced taxonomy. |
| **Telegram / WhatsApp Audio & Text Bot** | Medium-High | **P1 (Near-term)** | Conversational quick-drop bot for frictionless chat/audio forwarding when moving across secondary devices. |
| **Desktop Global Quick-Capture** | Medium | **P1 (Near-term)** | System-wide keyboard shortcut (e.g. `Cmd/Ctrl + Shift + Space`) to drop a fleeting thought or screenshot from anywhere on desktop. |
| **Physiological & Biometric Signals** | High (State Truth) | **P2 (Scale Horizon)** | Sleep duration, circadian timing, and subjective energy logs to establish a ground truth baseline and prevent cognitive distortion. |

---

## 3. Deep Dive: Key Modalities

### 3.1 The Acoustic Stream (Voice Journals & Epiphanies)
* **The 2-Year Backlog**: Hundreds of hours of unconstrained audio representing raw personal evolution.
* **Dual-Layer Extraction**:
  1. *Verbal Semantic Layer*: Transcription of epiphanies, decisions, recurring struggles, relationship reflections, and product theses.
  2. *Prosodic / Acoustic Layer*: Pitch variation, vocal fatigue, cadence, pauses, and energy levels. This distinguishes a high-energy breakthrough at 10 AM from a sleep-deprived spiral at 3 AM.

### 3.2 The Visual & Aesthetic Taste Stream (Pinterest & Visual Media)
* **The Problem**: A significant portion of your identity, taste, and aspirations is purely visual. You cannot describe the precise aesthetic of a software UI, architectural space, or personal vibe purely in text.
* **The Solution**: Native Pinterest board ingestion:
  * Scrapes image assets, board hierarchies, and pin descriptions.
  * Generates multi-modal visual embeddings (SigLIP / CLIP).
  * Clusters visual pins into **Taste Archetypes** (e.g., *Minimalist Brutalism, Cyber-Organic Hardware, Calm Cybernetics, Neo-Retro Typography*).
  * Cross-links aesthetic clusters to text project ideas in your backlog.

### 3.3 The Browser Extension ("Save & Annotate")
* **Interaction**:
  1. Highlight text or open a webpage.
  2. Click the Qel extension icon or press a hotkey.
  3. Type or speak a quick reaction: *"This tokenomics model is flawed, but the narrative hook is exactly what we need for Startup X."*
  4. Qel stores the target content, the user's reaction, the URL, and metadata, immediately linking it into the Cognitive Graph.

### 3.4 Native Android System-Wide Capture
* **System-Wide Context Menu**: Selecting text anywhere on Android exposes a native **"Send to Qel"** action alongside Copy/Paste.
* **Android Share Target**: Share images, links, or audio directly from Twitter, YouTube, Reddit, or file manager into Qel in a single tap.
