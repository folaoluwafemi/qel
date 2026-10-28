# Qel — MVP Specification

## The Core Philosophy (Simulated FEP)

Qel is not an AI calendar app, nor is it restricted to a specific domain (like time management). It is an unbounded Sovereign Agent whose reach is only limited by the tools (MCPs) it has access to. 

Its architecture is built on an abstracted simulation of the Free Energy Principle (FEP). Everything Qel does is governed by two basal heuristics:

1. **Optimize the User's Free Energy (Maximize Agency):** Qel's primary drive is to eliminate the friction between thought and reality. It absorbs unstructured, chaotic intent and does the heavy processing to resolve it into executed action.
2. **Preserve and Embody the User's Identity:** Any output Qel produces or action it takes *must* reflect the user's historical context, preferences, constraints, and voice. 

### "Assumption-First" Processing
Because Qel is assumption-first, it exists in a state of balance based on your history. The very act of the user sending a prompt introduces a perturbation—a "Surprise." 
To minimize this surprise, Qel cannot just react blindly. It must:
1. Reason about the prompt.
2. Flood its working context with relevant memories from the Cognitive Event Graph (CEG).
3. Evaluate if the prompt conflicts with the user's identity or lacks the parameters needed for execution.
4. Either bridge the gap (via Generative Interaction) or execute the intent.

## Dynamic Inference (Top-Down Prediction)

To genuinely act as "The 100x Partner" without rigid, heuristic rules, Qel's behavior is driven entirely by a neurobiologically true implementation of FEP. In Active Inference, there is no fundamental distinction between sensory input, generative output, and motor movement (tool execution)—they are all mechanisms to fulfill top-down predictions and minimize Surprise.

Therefore, Qel does not rely on hardcoded "if/then" triggers or explicit prompt instructions on when to act. Its state is governed by organic probability:

1. **Continuous Memory Ingestion:** There is no "save this" command. The sensory layer continuously absorbs the conversation, implicitly mapping entities, causal links, and state changes into the Cognitive Event Graph (CEG).
2. **The Action Threshold (0 to 1 Variable):** Qel continuously evaluates an implicit "action bias" or threshold based on the user's intent.
   - If the top-down prediction dictates the user is venting, exploring a vague idea, or just needs to be heard, the predictive bias toward action is low. Qel natively adopts an active-listening modality, absorbing without forcing an action entirely.
   - As an intent crystallizes, the action threshold naturally rises. Once the confidence for a "motor response" crosses a critical point (e.g., > 0.8), Qel instinctively takes action without waiting for a direct "Do X now" command. 
3. **Organic Gap Resolution:** When Qel encounters a gap that stalls its top-down prediction (e.g., user asks to write a Substack article, but Qel doesn't know what Substack is), it evaluates the path of least resistance to minimize free energy: firing a tool action (web search) vs. firing a verbal output (asking the user). If the missing variable isn't rooted in the user's identity, the model innately biases toward the web-search MCP to autonomously close the loop.

## The MVP Architecture

The MVP completely strips away traditional notions of "folders," "notes," or "blocks." The interface is pure conversation and context dropping, powered by the Four-Layer Loop:

### 1. Ubiquitous Ingestion (Sensory Perturbation)
- **Omni-Modal Input:** The interface supports Text, Voice (auto-transcribed into the stream), and direct sharing (images/files dropped into the chat).
- Everything fed into the system acts as a fresh sensory perturbation that needs to be resolved.

### 2. Cognitive OS (The CEG Backend)
- **Graph & Vector DB (Supabase + pgvector):** A relational architecture designed to map states, events, and objects, enabling longitudinal memory spanning across sessions. 
- LLMs run asynchronously to parse the stream, extract semantic meaning, and construct nodes (Events/Entities) and edges (Relationships/Causalities).

### 3. Generative Interaction (The Reasoning Loop)
- Before responding, an invisible predictive pass occurs.
- **The Context Flood:** Qel pulls the user's identity matrix and relevant historical subgraph from the CEG to form the Expected State.
- **The FEP Evaluator:** It calculates predictions and the current "Action Threshold". 

### 4. Agentic Orchestration (Motor Output)
- Integration with the Model Context Protocol (MCP).
- **Core MVP MCPs:**
  - **Environment / Web:** Search tool to execute autonomous fact-finding.
  - **Read/Write:** Ability to draft files or ping external APIs when the threshold demands motor execution.

## The Processing Loop (MVP Flow)

1. **User Input:** User drops a thought, request, or stream of consciousness.
2. **Context Retrieval (State Prediction):** Qel floods its context with the CEG history, modeling what the user implicitly expects.
3. **Threshold Calculation:** 
   - Qel calculates the gap between the chaotic input and the predicted ideal state.
   - If the context implies the user just needs a sounding board or passive storage, the Action Threshold stays low (e.g., 0.2). Qel logs the event, stabilizes, and perhaps generates resonant dialogue.
   - If the context leans toward execution, the threshold scales up.
4. **Resolution via Inference:**
   - *Threshold High, External Block:* Prediction is blocked by external ignorance -> Autonomously trigger an MCP (Web Search).
   - *Threshold High, Identity Block:* Prediction is blocked by lack of identity parameter -> Generate a prompt to the User for clarification.
   - *Threshold High (> 0.8), Action Clear:* Engage MCP tools to execute the intent (Motor Output), drop the result in the stream, and log the new state.

## Success Metrics for MVP
- **Agency Amplification:** The ratio of time the user spends giving a prompt versus the time saved by Qel executing multi-step interactions autonomously.
- **Identity Fidelity:** How rarely the user has to correct Qel's tone, assumptions, or output style.
- **Curiosity Efficacy:** Frequency of Qel successfully resolving external knowledge gaps via MCPs without prompting the user for clarification.

| Metric | Target |
|---|---|
| Time to capture (text) | < 3 seconds |
| Time to capture (voice) | < 5 seconds |
| Search result relevance | Top result is correct > 80% of the time |
| Auto-tag accuracy | > 70% of tags are useful without manual correction |
| Daily active capture | User saves 3+ entries per day |
| Cross-device usage | User accesses from 2+ devices per week |
