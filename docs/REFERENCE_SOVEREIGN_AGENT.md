# Qel: The 100x Partner (Reference Document)

*This document serves as the comprehensive reference for Qel's shift from a passive knowledge base to a proactive partner. It captures the deep technical and philosophical evolution of the product as discussed in late March 2026.*

---

## 1. The Core Vision: The 100x Partner

Qel has outgrown the "smart note-taking app" or "second brain" framing. Qel is **The 100x Partner**. 

It takes your cognition, execution, and productivity (both processing and output) and proactively imbibes it to become completely in sync with you. Rather than an assistant that acts "on your behalf" or does things "for" you, Qel is a symbiotic engine that works **with** you. While autonomous delegation is a capability, it is simply one component of this overarching "with" dynamic. The core deliverable is the amplification of your intent, boosting your capability to orchestrate reality without losing your personal touch.

## 2. The Problem We Are Solving

We are drowning in "Digital Noise" but starving for "Cognitive Clarity" and "Frictionless Execution."

*   **The Latent Gap:** We have the "vibes" of a great idea (often trapped in 30-minute unconstrained voice memos) but lack the time or structure to serialize it into words and bridge the gap from "thought" to "execution."
*   **The Delegation Gap & Planning Tax:** Ideas die because the "Distance to Action" is too high. Humans often lack the energy to plan the logistics of how to start. 
*   **The Trust Gap:** Standard AI agents (like a generic GPT) lack the user's history, health context, or values. Their execution is generic and unusable. You cannot delegate building a house or negotiating with a factory to an entity that doesn't understand your "Why."

## 3. The Technical Pillars (The Engine)

### A. Active Inference & The Free Energy Principle
Qel operates on Karl Friston’s Active Inference model—it acts to minimize "Surprise" (Variational Free Energy).
*   **The Logic:** If Qel models your preferred state (e.g., "Ready for a 12PM meeting") but lacks data (e.g., "Prep time is unknown"), it experiences Epistemic Uncertainty.
*   **The Action:** Instead of waiting to be told, Qel proactively acts to lower this uncertainty by asking a probing question ("Should we measure your prep time?") or taking an action.
*   **Hierarchical Active Inference (HAI):** 
    *   *Level 1 (Sensorimotor):* The fast loop (UI interactions, WhatsApp context menus).
    *   *Level 2 (Episodic):* The daily loop. Taking a messy 3-minute morning voice dump, mapping it to your graph, and identifying actionable tasks that offer the path of least resistance (lowest expected Free Energy).
    *   *Level 3 (Strategic):* The life loop. Long-term goals (e.g., "Build a robotics company") that maintain the *Prior Preferences* (your core values) which constrain all lower levels.

### B. The Cognitive Event Graph (CEG)
Standard knowledge bases use Entity Graphs (Nodes = Things). Qel uses a CEG, which maps **Process, Flow, and Causality**. It is a Dynamic Internal Knowledge Graph (DIKG).
*   **Three Layers:**
    1.  *Episodic (What):* Sequences of events in time.
    2.  *Causal (Why):* Logical connections and affordances between states.
    3.  *Semantic (Context):* Links to documents, media, and raw data.
*   **Spreading Activation:** When you mention an idea, the CEG lights up related clusters—even those from years ago. If you want to build a "Workout App," the graph activates your "Fitness" cluster but also your "Failure/Boredom" cluster (recognizing you hate gyms), prompting Qel to suggest alternative paths.

---

## 4. The Four-Layer Loop (The Architecture of Agency)

This loop represents the full pipeline from latent thought to real-world execution.

### Layer 1: Ubiquitous Ingestion (The Nervous System)
Qel is an omnipresent background listener, capturing both:
*   **Intentional Ingestion:** High-velocity capture. Highlights, browser extensions, OS share sheets, and deep, unconstrained voice memos.
*   **Passive / Ambient Ingestion:** "Digital exhaust." Tracking calendar shifts, location changes, health data (Oura/Watch), and code commit patterns.

### Layer 2: Personal OS for Cognition (The Brain)
*   **Background Rumination:** While the user sleeps or works, Qel evaluates incoming data against the CEG. 
*   **Gap Detection:** It looks for "lonely islands" of thought or logical contradictions. If you have three notes about mobile architecture but they don't explicitly connect to your startup vision, Qel flags this as a structural gap.

### Layer 3: Generative Interaction (The Interface / GenUI)
Qel dynamically composes the UI based on the intervention required to clarify intent. This is the **Epistemic Curiosity** layer. Modalities are expansive:
*   **The Notification / Quiet Prompt:** For low-friction data updates (e.g., confirming prep time).
*   **The Qel Call:** A VoIP/Agentic call. Qel calls you while you are commuting to talk through a complex idea because it knows you process thoughts better verbally.
*   **The Mural Board (Spatial / Visual / XR):** A 2D or 3D spatial canvas generated on the fly. Qel lays out a cluster of your ideas for you to interactively sort, facilitating the "Aha!" bridging moments.
*   **The "In-Process" Reasoning:** Qel forces you to articulate the unspoken. *"You keep saying 'tangible'—do you mean spatial or functional? Let's bridge that gap right now."*

### Layer 4: Agentic Orchestration (The Hands)
The loop-closer. Once an idea is clarified in Layer 3, Qel becomes a Sovereign Proxy.
*   **The Multi-Agent Controller:** Qel acts as the General. It holds your "Ground Truth" (prior preferences, constraints, budgets) and formulates a precise *Manifest*.
*   **Hiring Sub-Agents:** Using protocols like MCP (Model Context Protocol) or A2A (Agent-to-Agent), Qel spawns specialized agents (via frameworks like OpenCLAW or AutoGen). 
*   **Real-World APIs:** Qel directs these agents to interact with the real world—messaging Chinese factories, scaffolding GitHub repos, vetting construction contractors—while strictly validating their plans against your core preferences before executing.

---

## 5. The Use Cases in this New Paradigm

### 1. The Proactive Sounding Board (Ideation)
You record a 40-minute "vibe" voice note about a new startup feature. Qel parses it, compares it to your CEG, and proactively interrupts: *"You’re describing a reward loop here that contradicts what you learned about dopamine in your 2024 neuroscience notes. Should we adjust the feature or update your mental model?"*

### 2. The "Lazy Morning" Dump (High-Fidelity Agency)
You wake up tired and record: *"I'm drained. I have that new job thing, but I need to move forward on the robotics idea."*
Qel processes this through Hierarchical Active Inference (Policy Selection) and replies: *"I've cleared your morning meetings, briefed your lead dev agent on the new repository, and sent an inquiry to the Shenzhen supplier. You can rest. Here is your revised 1:00 PM starting point."*

### 3. Cross-Pollination via External Sensors (e.g., Harpenin integration)
Harpenin (Social Event Graph) logs that you attended a tech mixer with speaker 'Tobi'. Qel (Cognitive Event Graph) ingests this via a shared JSON-LD schema, cross-references it, and proactively pings you before you walk in: *"You're at a Flutter event. Last week you saved a note about 'Isolates' being a pain point. Tobi is here; maybe ask him how they handle heavy computation."*

### 4. Real-World Vet & Filter (The Executive Assistant)
You decide you need a house built. Qel doesn't just give you a Google Search list. It uses your Cognitive Profile to act as you: it emails contractors, asks them the highly specific technical/design questions it knows you care about, filters out the non-aligned responses, and presents you with the two best options ready for final approval.

---

## 6. Summary: New "Modalities"

The old modalities (Give, Receive, Do) fail to capture the proactivity. The true workflow is:

1. **Absorb:** Ubiquitous, frictionless capture of both deliberate input and passive digital exhaust.
2. **Reason:** Background rumination, Free Energy minimization, and generative multi-modal interaction (coaxing out latent ideas).
3. **Execute:** Sovereign orchestration of third-party agents and APIs to reshape the real world according to the user's intent. 

*Stop managing your life. Start leading it with Qel.*