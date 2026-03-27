# Qel — Architecture

## System Overview

Qel is structured as a three-layer system. At its core, Qel is a **shared memory between the user and AI** — a single source of truth that both can capture into, retrieve from, reason about, and act on.

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENTS                            │
│  Mobile App · Web App · Desktop App · Browser Extension │
│           · OS Context Menus · Voice Input               │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│                    API GATEWAY                           │
│            Authentication · Rate Limiting                │
└───────────────────────┬─────────────────────────────────┘
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
┌──────────────┐ ┌────────────┐ ┌──────────────┐
│   Ingestion  │ │   Search   │ │ Categorizer  │
│   Service    │ │   Service  │ │   Service    │
└──────┬───────┘ └─────┬──────┘ └──────┬───────┘
       │               │               │
       └───────────────┼───────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│                   DATA LAYER                             │
│  Vector DB (embeddings) · Object Store · Metadata DB     │
└─────────────────────────────────────────────────────────┘
```

---

## Layer 1: Knowledge Ingestion (MVP)

### Capture Flow

```
User Input (text / voice / image / link / clipping)
       │
       ▼
┌─────────────┐
│  Ingestion  │──► Normalize content (transcribe voice, extract text, etc.)
│  Pipeline   │──► Generate embeddings
│             │──► Auto-categorize (tags, topics, entities)
│             │──► Store in knowledge base
└─────────────┘
```

### Core Services

#### 1. Ingestion Service
- Accepts multi-modal input: plain text, rich text, URLs, images, audio
- Normalizes content into a unified internal representation
- Triggers embedding generation and auto-categorization
- Handles deduplication and conflict resolution

#### 2. Search Service
- **Natural language search**: semantic similarity via vector embeddings
- **Structured search**: filter by tags, date ranges, content type, source
- **Hybrid search**: combines semantic + structured for best results
- Returns ranked results with context snippets

#### 3. Categorization Service
- Automatic tagging based on content analysis
- Topic detection and clustering
- Entity extraction (people, places, projects, concepts)
- Learns and adapts to user's personal taxonomy over time

### Data Model (Conceptual)

Capture in Qel is structured as **notes** composed of **blocks** — similar to Notion's model.

- A **note** is a single capture event — the container. Semantic information (embeddings, topics, relationships) is computed at the note level, taking all blocks into account as a whole.
- A **block** is a primitive within a note. Block types include: text, image, audio, video, document (PDF, etc.), link, or any other media type.
- Blocks are ordered within a note. Users compose notes freely — a video link, followed by typed thoughts, followed by a voice memo, all in one note.

**Tagging**: TBD — whether tags apply at the note level, block level, or both is an open design decision.

---

## Clients

### Planned Clients (MVP)

| Client | Platform | Primary Use Case |
|---|---|---|
| **Mobile App** | iOS, Android | Quick capture on the go, voice input |
| **Web App** | Browser | Full experience — search, browse, organize |
| **Browser Extension** | Chrome, Firefox, Safari | "Save to Qel" for web content |

### Planned Clients (Post-MVP)

| Client | Platform | Primary Use Case |
|---|---|---|
| **Desktop App** | macOS, Windows | System-level integration, context menu |
| **OS Context Menu** | Android, iOS | "Save to Qel" from any text selection |

### Capture Points (Friction Reduction)

The key design principle is: **the fewer steps between having a thought and saving it, the better.**

1. **Native share sheet** (Android/iOS) — Select text → Share → Save to Qel
2. **Browser extension** — Highlight text → Right-click → Save to Qel
3. **Quick capture widget** — Home screen widget for instant text/voice input
4. **Voice input** — Tap and speak; Qel transcribes and stores
5. **Desktop context menu** — Select text anywhere → Save to Qel
6. **API** — For power users and integrations (e.g., Zapier, IFTTT, Shortcuts)

---

## Layer 2: Shared Memory Interface

The knowledge base is a **shared memory between the user and Qel**. Layer 2 is the interface through which both access it — a single source of truth for capture, retrieval, reasoning, and action.

### Options Under Consideration

| Approach | Description |
|---|---|
| **MCP Server** | Model Context Protocol — standardized way for LLMs to access tools and data |
| **Mem0-style API** | Memory-as-a-service — persistent context layer for AI agents |

### Capabilities

- Semantic retrieval (`query` → relevant knowledge entries)
- Structured retrieval (`get entries tagged "project-x"`)
- Memory write-back (both user and AI can store new knowledge)
- User context (how the user thinks, talks, what they're working on)
- Authentication + scoped access control

---

## Layer 3: Qel — The AI Friend

The conversational layer. Qel is an AI that shares your knowledge layer — it knows who you are, what you care about, and what you're working on. Like a friend or assistant with perfect memory of everything you've shared.

- **Draft & Generate** — "Write a message to this person about collaborating" — grounded in your context and voice
- **Brainstorm** — "How does this idea apply to my project?" — using your captured knowledge
- **Plan** — "Plan my day" — with full knowledge of your priorities and habits
- **Clarify** — "What's the word for this concept I've been thinking about?" — connecting dots across your knowledge
- **Act** — Diverse, open-ended actions that build on everything in the shared knowledge layer

---

## Technology Decisions (TBD)

These decisions will be made as we begin implementation:

| Decision | Options to Evaluate |
|---|---|
| **Backend language/framework** | TBD |
| **Database** | TBD |
| **Vector database** | TBD |
| **Mobile framework** | Flutter (already in `lib/`), React Native, etc. |
| **Web framework** | TBD |
| **Auth** | TBD |
| **Hosting** | TBD |
| **LLM provider** | TBD |
| **Embedding model** | TBD |
