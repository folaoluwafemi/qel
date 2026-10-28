# Technical Spec 03: Cloudflare Durable Objects & Realtime Synchronization

> *"Stateful, low-latency in-memory actors for WebSocket streaming, live graph caching, and asynchronous void matching."*

---

## 1. Durable Objects Architecture Overview

Cloudflare Durable Objects (DO) provide strongly consistent, globally unique in-memory compute instances that persist state across client reconnections.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                      DURABLE OBJECTS TOPOLOGY                            │
├────────────────────────────┬────────────────────────────┬────────────────┤
│      LiveSessionDO         │      CognitiveGraphDO      │ VoidMatcherDO  │
│  • WebSocket Connections   │  • In-Memory Graph Subsets │  • Asynchronous│
│  • Streaming Audio/Text    │  • Fast Spreading Act.     │    Void Socket │
│  • Ephemeral Chat Buffer   │  • Local Trajectory Cache  │    Resolution  │
└────────────────────────────┴────────────────────────────┴────────────────┘
```

---

## 2. The Three Core Durable Objects

### 2.1 `LiveSessionDO` (Realtime Conversation & Streaming)
* **Purpose**: Coordinates live conversational sessions with the AI Thinking Partner.
* **Responsibilities**:
  * Manages active WebSocket connections across user devices (Mobile, Desktop, Browser Ext).
  * Streams LLM inference tokens in real-time with sub-50ms Time-To-First-Token (TTFT).
  * Broadcasts new artifact events instantly so the client's visual masonry grid updates in realtime.
* **WebSocket Message Protocol**:
  ```json
  // Client -> DO (Start Sparring)
  {
    "type": "USER_UTTERANCE",
    "session_id": "sess_123",
    "content": "Looking at Idea #4, what was my epiphany from June 2024 about UI friction?",
    "active_spaces": ["spc_cognitive_arch"]
  }

  // DO -> Client (Streamed Token Chunk)
  {
    "type": "AI_TOKEN_STREAM",
    "token": "In",
    "precision_state": "ground_truth_verified",
    "referenced_artifact_ids": ["chk_june_2024_01"]
  }
  ```

### 2.2 `CognitiveGraphDO` (In-Memory Graph Traversal & Spreading Activation)
* **Purpose**: Avoids hitting the primary PostgreSQL database with heavy recursive queries on every conversational turn.
* **Mechanism**:
  * Loads the user's active life subgraphs and recent 90-day trajectory nodes into DO memory.
  * Runs in-memory **Spreading Activation**: When a concept is mentioned, it calculates decay weights and identifies activated neighbor nodes in <5ms.

### 2.3 `EpistemicVoidMatcherDO` (Asynchronous Socket Matcher)
* **Purpose**: Listens to the `ingest-queue` whenever a new checkpoint is created and tests for void closure.
* **Execution Flow**:
  1. Retrieves all `open` records from `epistemic_void_index`.
  2. Runs semantic similarity and temporal proximity scoring between the new artifact and open voids.
  3. If similarity > 0.82 and temporal direction is valid:
     * Updates `epistemic_void_index` to `resolved`.
     * Inserts confirmed causal edge into `causal_links`.
     * Emits a quiet telemetry event to `LiveSessionDO`.

---

## 3. Hibernation & Cost Optimization

Cloudflare Durable Objects use the **WebSocket Hibernation API**:
* When a user is not actively streaming messages, the DO hibernates in memory while keeping the WebSocket connection open.
* Zero compute charges while the connection is idle, waking up in milliseconds when the user speaks or sends a new thought.
