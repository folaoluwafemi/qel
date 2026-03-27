# Qel — Spaces (Feature Concept)

## Overview

Spaces are **persistent thinking environments** — contextual containers where capture, thinking, and action happen together around a topic, project, or source. They go beyond storage and retrieval — they're where ideas take shape and work gets done.

---

## The Problem Spaces Solve

Storing and searching knowledge is necessary but not sufficient. Sometimes you need a **place where a topic lives** — with its sources, your reactions, your generated outputs, and your ongoing threads. Not stored and forgotten, but actively worked on over time.

You need to:

- Keep all context about a project or topic in one place
- Return to a line of thinking days or weeks later and pick up where you left off
- Brainstorm, draft, and generate — all within the context of what you've already captured
- Converse with Qel while surrounded by the relevant artifacts

Qel already holds the artifacts. **Spaces give you a place to think with them.**

---

## Space Types

| Type | Description | Use Case |
|---|---|---|
| **Brain Space** | Persistent working context tied to a topic, project, or source. The primary Space type. | Research, ongoing projects, deep dives, any topic that lives over time |
| **Mood Board** | Visual canvas with images, colors, text snippets, links | Creative direction, aesthetic exploration, vision boards |
| **Mind Map** | Node-and-edge graph for branching ideas | Brainstorming, topic exploration, planning |
| **Conversation** | AI chat grounded in a subset of your knowledge | Thought clarification, deep dives, brainstorming with context |

## Core Principles

### 1. Spaces Are Where Thinking Happens
A Space isn't a folder. It's an active environment. You capture into it, think inside it, converse with Qel about it, and generate outputs from it. The flow: **Capture → Think → Converse → Act.**

### 2. Shared Context Between You and Qel
Every Space is a shared working context. You and Qel can both see what's there, pull in related knowledge, and build on it. When you ask Qel to draft something in a Space, it has full context — not just the artifacts, but the *thinking* around them.

### 3. Persistent and Evolving
A Space isn't a one-time session. It persists. You come back to it. Add new sources. Refine your thinking. The Space grows as your understanding grows.

### 4. AI-Assisted, User-Driven
Qel can suggest, generate, rearrange, and brainstorm — but the user is in control. AI helps you think; it doesn't think for you.

### 5. Spaces Are Shareable (Future)
A Space could become a presentation, a brief, or a shared reference — but that's post-MVP.

---

## Interaction Model

```
┌─────────────────────────────────────────────┐
│                   SPACE                      │
│                                              │
│   ┌──────┐  ┌──────┐  ┌──────┐             │
│   │ Note │  │Image │  │ Link │   ...        │
│   └──────┘  └──────┘  └──────┘             │
│                                              │
│      Capture · Think · Converse · Act        │
│                                              │
│   ┌────────────────────────────────────┐    │
│   │  💬 "Draft a message for me"       │    │
│   │  🤖 Qel generates using context    │    │
│   └────────────────────────────────────┘    │
│                                              │
└─────────────────────────────────────────────┘
```

---

## Inspiration

| Product | What we learn |
|---|---|
| **NotebookLM** | AI that understands a curated subset of your content; conversational interaction with your documents |
| **Miro / FigJam** | Spatial canvas, sticky notes, freeform arrangement |
| **Pinterest Boards** | Mood board curation, visual discovery |
| **Are.na** | Thoughtful, non-algorithmic collection and connection of ideas |

---

## Priority

Spaces is a **post-MVP feature** — it adds a new dimension of complexity to the client. However, the data model should be designed with Spaces in mind from the start so notes and blocks are Space-ready when we get there.

### MVP relevance
- The grid view (mymind-style) in MVP is effectively a read-only, auto-arranged Space
- The conversational AI (Qel) in MVP is a lightweight version of the Conversation space type
- Brain Spaces emerge naturally once the shared knowledge layer and Qel are solid
- These can evolve into full Spaces without a rewrite if planned well
