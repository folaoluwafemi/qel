# Qel — MVP Specification

## Scope

The MVP has two halves:

1. **The Shared Knowledge Layer** — a personal knowledge base that serves as shared memory between you and AI. Effortless capture, smart categorization, and natural language search.
2. **Qel, the AI Friend** — a conversational AI that draws on your shared knowledge to help you think, create, and act. Not a generic chatbot — an assistant that *knows you* because it has access to everything you've captured.

Together, these enable three modalities: **Give** (capture), **Receive** (retrieve), and **Do** (act).

---

## User Stories

### Capture

| # | As a user, I want to... | So that... |
|---|---|---|
| C1 | Save a text note from my phone in under 3 seconds | Fleeting thoughts don't get lost |
| C2 | Save a voice memo that gets auto-transcribed | I can capture thoughts hands-free |
| C3 | Highlight text on a webpage and save it to Qel | I don't lose things I read online |
| C4 | Share content from any app via the OS share sheet | Qel is always one tap away |
| C5 | Save an image with automatic text/context extraction | Visual information is searchable too |
| C6 | Paste a URL and have Qel extract the key content | I don't just save links — I save knowledge |

### Search & Retrieval

| # | As a user, I want to... | So that... |
|---|---|---|
| S1 | Search my knowledge base in natural language | I find things the way I remember them |
| S2 | Browse all my entries in a visual, mymind-like grid | I can rediscover things serendipitously |
| S3 | Filter by tags, date, and content type | I can narrow down when I know roughly what I'm looking for |
| S4 | See related entries when viewing one entry | Connections between ideas surface automatically |

### Action & Generation

| # | As a user, I want to... | So that... |
|---|---|---|
| D1 | Ask Qel to draft a message based on something I just captured | I can act on new information immediately |
| D2 | Brainstorm with Qel using my captured knowledge as context | My thinking is grounded in what I already know |
| D3 | Have Qel generate content in my voice and style | Output feels like me, not a generic AI |
| D4 | Converse with Qel about a specific note or topic | I can deepen my thinking with an AI that shares my context |

### Organization

| # | As a user, I want to... | So that... |
|---|---|---|
| O1 | Have my entries auto-tagged without manual effort | Organization happens without friction |
| O2 | See my knowledge clustered by topic | I understand the shape of what I know |
| O3 | Manually add or remove tags when needed | I stay in control when the AI gets it wrong |
| O4 | Have a "thought clarification" mode where Qel helps me articulate vague ideas | I find the right words faster |

### Account & Settings

| # | As a user, I want to... | So that... |
|---|---|---|
| A1 | Create an account and log in securely | My knowledge is private and persistent |
| A2 | Access my knowledge from any device | I'm not locked to one platform |
| A3 | Export my data | I own my knowledge |

---

## Capture Model

Capture in Qel is structured as **notes** composed of **blocks** — similar to Notion's model.

- A **note** is a single capture event — the container.
- A **block** is a primitive within a note: text, image, audio, video, document (PDF, etc.), link, or any other media type.
- Users compose notes by combining blocks freely — a video link, followed by typed thoughts, followed by a voice memo, all in one note.

Semantic information (embeddings, topics, relationships) is computed at the **note level**, taking all blocks into account. The system understands the *combined meaning* of everything in a note — not just each piece in isolation.

**Tagging**: TBD — whether tags apply at the note level, block level, or both is an open design decision.

---

## MVP Feature Set

### Must Have (P0)

- [ ] User authentication (sign up, log in, log out)
- [ ] Quick text capture (mobile + web)
- [ ] Voice capture with transcription (mobile)
- [ ] Auto-tagging on ingestion
- [ ] Natural language search
- [ ] Visual browse / grid view (mymind-style)
- [ ] Tag-based filtering
- [ ] Mobile app (iOS + Android)
- [ ] Web app
- [ ] Conversational AI chat (talk to Qel)
- [ ] Context-aware generation (drafts, brainstorms, summaries grounded in your knowledge)

### Should Have (P1)

- [ ] Browser extension (Chrome)
- [ ] URL ingestion with content extraction
- [ ] Image capture with OCR / context extraction
- [ ] Related entries suggestions
- [ ] Date range filtering
- [ ] OS share sheet integration (Android + iOS)
- [ ] Generation in user's voice and style (learned from captured content)

### Nice to Have (P2)

- [ ] Desktop app
- [ ] Desktop OS context menu integration
- [ ] Thought clarification mode
- [ ] Topic clustering visualization
- [ ] Data export

---

## Screens (High Level)

### Mobile App

1. **Home / Feed** — Visual grid of recent entries (mymind-style)
2. **Capture** — Floating action button → text input or voice recorder
3. **Chat** — Conversational interface with Qel (ask, brainstorm, generate)
4. **Search** — Natural language search bar with results
5. **Entry Detail** — View a single entry with tags, related items, metadata
6. **Settings** — Account, preferences, export

### Web App

1. **Dashboard** — Visual grid/masonry layout of all knowledge
2. **Chat** — Conversational interface with Qel
3. **Search** — Prominent search bar, filters sidebar
4. **Entry Detail** — Expanded view with related entries
5. **Settings** — Account management, integrations, export

### Browser Extension

1. **Popup** — Quick text capture
2. **Context Menu** — Right-click → "Save to Qel"
3. **Highlight** — Select text → floating "Save to Qel" button

---

## Success Metrics

| Metric | Target |
|---|---|
| Time to capture (text) | < 3 seconds |
| Time to capture (voice) | < 5 seconds |
| Search result relevance | Top result is correct > 80% of the time |
| Auto-tag accuracy | > 70% of tags are useful without manual correction |
| Daily active capture | User saves 3+ entries per day |
| Cross-device usage | User accesses from 2+ devices per week |
