# Qel — Use Cases

## UC-1: Context Capture → Synthesis → Action (The "Watch & Work" Flow)

### Origin

Discovered while watching a podcast ([Builders & Titans — YouTube](https://www.youtube.com/watch?v=Vxi5GQZBrxU)) and taking notes. The founder realized this exact workflow — capturing context, jotting thoughts, then *acting* on it — is the core reason Qel exists.

### The Scenario

You're watching a podcast. The guest says things that resonate — ideas, frameworks, phrases. You pause, jot notes:

```
- Permission to innovate.
- Concerts struggle & Softlife.
- The "Gist" market as narrative social objects.
- Win in Nigeria, win everywhere.
- A place for culture.

Agency, Softlife (making transactions easier), narrative social objects, culture.
```

These aren't polished notes. They're *reactions* — half-formed thoughts, keywords, shorthand only you understand. But they're tied to a specific source (the video) and a specific moment of thinking.

Then, almost immediately, you want to **do something** with what you just captured:

- Draft a cold outreach message to the podcast guest about a potential collaboration on another startup you're working on.
- Brainstorm how the guest's ideas (e.g., "narrative social objects," "softlife," "win in Nigeria, win everywhere") could reshape the product offering of that other startup.
- Use this as a "brain space" — a reference point you return to later as your thinking evolves.

### What This Use Case Reveals

#### 1. Capture is contextual, not atomic

The notes alone are meaningless. Their value comes from:
- **The source** — a specific YouTube video, a specific guest, a specific conversation.
- **The user's reaction** — what they found important, how they interpreted it.
- **The user's intent** — why they were watching, what they're working on, what they want to do next.

Qel needs to capture all three — not just the text.

#### 2. The user's identity is the product's engine

The outreach message isn't generated from the podcast notes alone. It requires knowing:
- Who the user is (their background, their voice, their work).
- What they're working on (other startups, projects, goals).
- How they communicate (tone, style, level of formality).
- Their history of thinking about related topics.

**Qel needs to know who you are based on everything you've previously documented.** This is the memory layer — not just storing entries, but building a cumulative, evolving understanding of the user as a person.

#### 3. The action is immediate and varied

The user doesn't capture now and act later (though they could). They capture and act *in the same breath*:
- Generate an outreach message (content generation grounded in personal context).
- Brainstorm product pivots (ideation grounded in new input + existing knowledge).
- Save as a reference to revisit (persistent context for future thinking).

This isn't "save now, search later." It's **save and do, right now**.

#### 4. The flow crosses projects and contexts

The podcast is one context. The cold outreach is another. The other startup is a third. But they're all connected through the user. Qel doesn't just store information per-topic — it connects information *through the person* who captured it.

### The Ideal Qel Flow

```
1. WATCH / READ / EXPERIENCE
   User encounters something — a podcast, article, conversation.

2. CAPTURE + CONTEXT
   User saves their notes + the source.
   Qel captures: the raw notes, the source URL, the timestamp, 
   and infers what the user was thinking about (based on recent activity, 
   active projects, stated goals).

3. IMMEDIATE ACTION (optional)
   User says: "Draft a message to this person about collaborating on [startup]."
   Qel generates the message using:
   - The podcast notes (what was said)
   - The user's identity (who they are, how they write)
   - The user's projects (what they're working on)
   - Previous related knowledge (past thinking on this topic)

4. PERSISTENT MEMORY
   Everything is stored — the source, the notes, the generated message, 
   the context of why it was created. This becomes part of the user's 
   evolving knowledge base.

5. FUTURE RETRIEVAL + REUSE
   Later, the user can:
   - Search: "What did I think about that podcast with [guest]?"
   - Brainstorm: "How do narrative social objects apply to [project]?"
   - Revisit: Open the brain space and continue thinking.
   - Generate: "Write a follow-up based on how my thinking has evolved."
```

### What Qel Needs to Support This

| Capability | Description | Current Status |
|---|---|---|
| **Source-linked capture** | Notes tied to a specific URL/source with metadata extraction | Partially covered (URL ingestion in MVP P1) |
| **Reaction capture** | Distinguishing user's thoughts from source content | Not explicitly modeled |
| **Identity layer** | Cumulative user profile built from all captured knowledge — voice, interests, projects, communication style | Not in current spec (implicit in Layer 2/3) |
| **Immediate generation** | Using captured context + identity to generate content (messages, drafts, plans) on the spot | Future (Layer 3 agents) |
| **Cross-project connections** | Linking knowledge across different projects/contexts through the user | Partially covered (tags, semantic search) |
| **Brain spaces** | Persistent thinking environments tied to a topic or source | Aligns with Spaces concept, but needs "working context" framing |

### Key Quote (Founder)

> "This is the reason I'm building Qel — to know who I am based off of all of the previous things that I've documented and be able to easily generate the right message when I need it, how I need it, and then do more."

---

*This is the first documented use case. It represents the most foundational flow in Qel: capture context, build identity, take action.*
