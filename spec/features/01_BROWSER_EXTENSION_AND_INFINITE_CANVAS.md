# Feature Spec: Browser Extension & Infinite Thinking Canvas
*The Hybrid of Raindrop, Milanote & Excalidraw for Web Capture and Spatial Ideation*

---

## 1. Executive Summary & Vision

The **Qel Browser Extension** is not a passive bookmarking drawer. It is a high-velocity **Capture Engine and Spatial Ideation Workbench** that unifies:
1. **Raindrop-style omni-modal web capture**: Instant one-shortcut capture of text, links, high-res images, videos, audio, and full page snapshots.
2. **Milanote / Miro / Excalidraw-style Infinite Canvas**: A spatial 2D surface where captured artifacts can be freely arranged, annotated, re-labeled, connected with arrows, and sketched alongside raw ideas.
3. **Configurable New Tab Experience**: Opening a new browser tab instantly brings you into your active Qel Canvas or visual stream.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                   BROWSER EXTENSION & CANVAS ECOSYSTEM                   │
├──────────────────────────────────────────────────────────────────────────┤
│ 1. GLOBAL CAPTURE SHORTCUT (`Cmd/Ctrl + Shift + S` or customizable)      │
│    • Highlights text / right-clicks image / clips video / captures link  │
│    • Instant mini-dock: label, add audio thought, or drop to Canvas      │
├──────────────────────────────────────────────────────────────────────────┤
│ 2. CONFIGURABLE NEW TAB EXPERIENCE                                       │
│    • Mode A: Active Infinite Canvas (Milanote/Excalidraw workspace)      │
│    • Mode B: Serene Visual Stream (mymind masonry grid)                  │
│    • Mode C: Minimalist Omnibox Focus Bar                                │
├──────────────────────────────────────────────────────────────────────────┤
│ 3. THE INFINITE THINKING CANVAS (Excalidraw + Milanote Engine)           │
│    • Freeform 2D spatial arrangement (pan, zoom, multi-select)           │
│    • Spatial primitives: Web Cards, Image Cards, Text/Markdown Notes,    │
│      Sticky Notes, Audio Waveforms, Connectors/Arrows, Freehand Sketched │
│    • Live AI Thinking Partner overlaid on the canvas                     │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Ingestion Touchpoints & Capture Mechanics

### 2.1 The Omni-Capture Shortcut
* **Trigger**: Pressing `Cmd/Ctrl + Shift + S` anywhere on the web, or right-clicking selected content.
* **Smart Detection**:
  * *Selected Text*: Captures snippet + source URL + metadata + user annotation tooltip.
  * *Hovered Image / Video*: Captures high-res media direct to Cloudflare R2 + extracts dominant color palette + OCR.
  * *Active Webpage*: Strips visual junk and captures clean **Reading Mode** HTML + thumbnail + favicon.
  * *Quick Voice Reaction*: Holding down `Space` inside the capture dock records an instant voice reaction attached to the clipped link.

### 2.2 Direct Canvas Drop
When capturing from the web, the user can choose:
* **"Send to Qel Stream"**: Drops directly into the main mymind visual stream.
* **"Drop on Active Canvas"**: Instantly places the item as a movable card on your current New Tab spatial canvas.

---

## 3. The Infinite Canvas Architecture (Excalidraw / Milanote Model)

The Canvas allows you to organize ideas visually without forcing rigid hierarchical folder structures.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                     THE INFINITE SPATIAL WORKBENCH                       │
│                                                                          │
│  ┌───────────────────────┐                  ┌─────────────────────────┐  │
│  │   WEB CARD: PODCAST   │                  │     PINTEREST PIN       │  │
│  │   "Builders & Titans" │                  │   [Brutalist Design]    │  │
│  │   [Hero Thumbnail]    │                  │   #111318 · #FF4D00     │  │
│  └───────────┬───────────┘                  └────────────▲────────────┘  │
│              │                                           │               │
│              │ [Connecting Arrow / Relational Link]      │               │
│              ▼                                           │               │
│  ┌───────────────────────────────────────────────────────┴────────────┐  │
│  │                     EXCALIDRAW-STYLE SKETCH                        │  │
│  │   ~ ~ ~ ~ ~ (Freehand system architecture sketch) ~ ~ ~ ~ ~        │  │
│  │   "Narrative social objects + Agentic execution loop"              │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  ┌──────────────────────────────────┐      ┌──────────────────────────┐  │
│  │         AUDIO WAVEFORM           │      │       STICKY NOTE        │  │
│  │   2:40 AM Epiphany [Play]        │◄────►│   "Vibe-code this using  │  │
│  │   "What if the extension is..."  │      │    Gemini 3.7 Flash!"    │  │
│  └──────────────────────────────────┘      └──────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Spatial Element Typology
| Element Type | Rendered Card Appearance | Interactive Capabilities |
|---|---|---|
| **Web Bookmark Card** | Rich preview card with hero image, favicon, domain, and title. | Click to open, inline re-labeling, drag to connect. |
| **Visual Inspo / Image** | High-resolution image tile with extracted color palette bar. | Resize, crop, annotate with arrows, OCR text selection. |
| **Audio Note Card** | Interactive waveform scrub card with duration badge. | In-canvas audio playback, transcript expansion. |
| **Sticky Note / Markdown** | Colorful sticky card with markdown support (Geist font). | Inline rich-text editing, color tagging. |
| **Freehand Vector Drawings** | Excalidraw-style vector lines, boxes, circles, and sketches. | Draw directly with stylus or mouse, group with cards. |
| **Causal Connectors** | Smart directional arrows (curved / orthogonal). | Links two cards and generates a `causal_link` in the backend. |

---

## 4. Technical Implementation & Data Synchronization

### 4.1 Canvas Engine (Client-Side)
* Built on top of a high-performance 2D canvas engine (e.g. **Excalidraw core** or **tldraw engine**) customized with Qel design tokens (`#111318` graphite, `#FF4D00` fiery orange, `#F7F7F9` background).
* Vector data stored as lightweight JSON scene graphs:
  ```typescript
  interface CanvasScene {
    id: string;
    space_id: string;
    viewport: { x: number; y: number; zoom: number };
    elements: Array<CanvasNode | CanvasConnector | CanvasDrawing>;
    updated_at: string;
  }
  ```

### 4.2 Realtime Sync via Cloudflare Durable Objects
* Every Canvas is paired with a `CanvasSpaceDO` on Cloudflare.
* Canvas edits synchronize in realtime via WebSockets with conflict-free CRDT / operational transform updates.
* Instant offline persistence in browser `IndexedDB`.

---

## 5. User Configurability & Preferences

* **New Tab Target**: `[ Canvas Mode (Default) | Visual Stream Mode | Clean Omnibox | Custom URL ]`
* **Default Capture Action**: `[ Quick Stream Ingestion | Open Canvas Picker | Floating Reaction Dock ]`
* **Theme**: `[ Obsidian Dark (#111318) | Serene Light (#F7F7F9) | System ]`
