# Technical Spec 07: Multi-Modal AI Model Layer & Functional Specifications

> *"Decoupled, vendor-agnostic functional model specifications for fast, lightweight, and cost-effective multi-modal AI."*

---

## 1. Functional Model Architecture & Pluggable Router

Rather than hardcoding specific AI vendors, Qel's `packages/ai-router` is built around **functional, pluggable interfaces**. This allows swapping in lightweight, fast, and cost-effective models (e.g. edge models, open-weights, or specialized micro-services) as new benchmarks emerge.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                   FUNCTIONAL AI MODEL CAPABILITY MATRIX                  │
├──────────────────────────────────────────────────────────────────────────┤
│ 1. AUDIO TRANSCRIBER (ASR)                                               │
│    • Input: Raw audio (.m4a, .mp3, .wav)                                 │
│    • Output: Verbatim text transcript with word/segment timestamps       │
│    • Requirement: High speed (<5s for 10 min audio), low cost, small     │
│      memory footprint (e.g. Whisper-tiny/base/turbo, Phonon-1, sherpa)   │
├──────────────────────────────────────────────────────────────────────────┤
│ 2. ACOUSTIC PROSODY & FATIGUE CLASSIFIER                                 │
│    • Input: Raw audio waveform / spectrogram slices                      │
│    • Output: Speech rate (WPM), pitch variance, vocal energy (RMS),      │
│      fatigue index (0.0 to 1.0)                                          │
│    • Requirement: Ultra-lightweight acoustic embedding or audio-SSL model│
│      (e.g. wav2vec2-small, HuBERT, or lightweight edge classifier)       │
├──────────────────────────────────────────────────────────────────────────┤
│ 3. VISUAL EMBEDDER (IMAGE VECTORIZER)                                    │
│    • Input: High-res images, Pinterest pins, screenshots                 │
│    • Output: Normalized vector (512-d or 768-d)                          │
│    • Requirement: Multi-modal vision encoder (e.g. MobileCLIP, SigLIP-B, │
│      MiniCPM-V, or lightweight ViT) for Cloudflare Vectorize similarity   │
├──────────────────────────────────────────────────────────────────────────┤
│ 4. VISUAL OCR & PALETTE EXTRACTOR                                        │
│    • Input: Screenshot / Pinterest image                                 │
│    • Output: Extracted text within image + Top-4 dominant HEX colors     │
│    • Requirement: K-Means on client/worker for palette + Tesseract.js /  │
│      ultra-small VLM (e.g. Moondream2, Nanova) for text extraction       │
├──────────────────────────────────────────────────────────────────────────┤
│ 5. TEXT EMBEDDER (SEMANTIC VECTORIZER)                                   │
│    • Input: Text chunks (notes, web clippings, transcript paragraphs)    │
│    • Output: Normalized vector (384-d, 768-d, or 1024-d)                 │
│    • Requirement: Fast embedding model (e.g. BGE-small-en, MiniLM-L6,    │
│      or Cloudflare Workers AI `@cf/baai/bge-small-en-v1.5`)              │
├──────────────────────────────────────────────────────────────────────────┤
│ 6. COGNITIVE REASONING & SPARRING ENGINE                                 │
│    • Input: Long-context prompt with CEG subgraphs & user intent         │
│    • Output: Streaming conversational tokens, narrative reports, PRDs    │
│    • Requirement: Low-cost reasoning LLM with fast TTFT (<200ms) and     │
│      32k–128k context window (e.g. DeepSeek-Lite, Qwen2.5-Coder-7B/14B,  │
│      Llama-3.3-8B, or lightweight frontier flash tier)                   │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Pluggable TypeScript Adapter Interfaces (`packages/ai-router`)

```typescript
// packages/ai-router/src/types.ts

export interface AudioTranscribeRequest {
  audioBuffer: ArrayBuffer;
  mimeType: string;
  language?: string;
}

export interface AudioTranscribeResult {
  text: string;
  durationSeconds: number;
  segments: Array<{ start: number; end: number; text: string }>;
}

export interface ProsodyAnalysisResult {
  speechRateWpm: number;
  pitchVarianceHz: number;
  vocalEnergyRms: number;
  fatigueScore: number; // 0.0 to 1.0
  epiphanyQuotes: string[];
}

export interface VisionAnalysisResult {
  dominantColors: string[]; // ['#111318', '#FF4D00', '#F7F7F9']
  ocrText?: string;
  aestheticTags: string[];
  visualEmbedding: number[]; // 512-d or 768-d
}

export interface TextEmbeddingResult {
  embedding: number[];
  dimensions: number;
}

export interface ReasoningStreamRequest {
  systemPrompt: string;
  contextGraphJson: string;
  userMessage: string;
  onToken: (token: string) => void;
}
```
