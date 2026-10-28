Here's the complete architecture document. You can copy-paste this directly into a file named `transcription_stack.md` in your project.

```markdown
# Transcription Stack Architecture

This document outlines two production-ready architectures for **long-form audio transcription with environmental context and emotional dynamics**. Both stacks implement a dual-stream pipeline that separates speech, silence, and ambient sounds for maximum accuracy and cost efficiency.

---

## 📐 High-Level Pipeline (Both Stacks)

```
┌─────────────────────────────────────────────────────────────────┐
│                    1-Hour Raw Audio Input                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │   Step 1: VAD / Silence Map  │  ← Local (Silero VAD)
              │   Outputs: speech/silence    │     ~1 second
              │   timeline with timestamps   │
              └──────────────┬───────────────┘
                             │
              ┌──────────────┴───────────────┐
              │                              │
              ▼                              ▼
   ┌──────────────────────┐      ┌──────────────────────┐
   │ Step 2: Speech +     │      │ Step 3: Ambient      │
   │ Emotion Stream       │      │ Stream (sampled      │
   │ (verbatim + tags)    │      │ from silent gaps)    │
   └──────────┬───────────┘      └──────────┬───────────┘
              │                              │
              └──────────────┬───────────────┘
                             ▼
              ┌──────────────────────────────┐
              │ Step 4: Merge & Emotion      │  ← Small LLM
              │ Synthesis                    │
              │ Outputs: rich journal entry  │
              └──────────────────────────────┘
```

---

## 🌐 Stack 1: Hybrid Cloud (Cheapest + Fastest)

**Best for:** MVPs, low-budget projects, teams without GPU hardware, fast iteration.

### Components

| Step | Component | Provider | Model | Cost | Speed |
|------|-----------|----------|-------|------|-------|
| 1 | VAD | **Local** | `silero-vad` (PyTorch) | $0.00 | ~1s / hour |
| 2 | Speech Transcription | **Deepgram** | `nova-2` | ~$0.26/hr (or **$200 free credits** = ~460 hrs) | ~6 min / hour |
| 3 | Ambient Classification | **Hugging Face** | `MIT/ast-finetuned-audioset-10-10-0.4593` | $0.00 (Inference API free tier) | ~2s / clip |
| 4 | Merge + Emotion | **Groq** | `llama-3.1-8b-instant` or `mixtral-8x7b` | $0.00 (free tier, generous limits) | ~0.2s |

**Total cost per hour of audio:** ~$0.26 (or $0.00 while in free tier)  
**Total wall-clock time:** ~6 minutes (dominated by upload + Deepgram queue)

### Setup

```bash
# Local dependencies
pip install silero-vad torch pydub groq deepgram-sdk transformers

# Environment variables
export DEEPGRAM_API_KEY="your-key-here"
export GROQ_API_KEY="your-key-here"
export HF_TOKEN="your-key-here"  # optional, for higher HF rate limits
```

### Key Code Snippets

**VAD (Silero):**
```python
import torch
model, utils = torch.hub.load(repo_or_dir='snakers4/silero-vad', model='silero_vad')
(get_speech_timestamps, _, read_audio, _, _) = utils
wav = read_audio('input.wav', sampling_rate=16000)
speech_timestamps = get_speech_timestamps(wav, model, sampling_rate=16000)
# → [{"start": 15.2, "end": 45.8}, ...]
```

**Deepgram ASR:**
```python
from deepgram import DeepgramClient
dg = DeepgramClient(api_key=os.environ["DEEPGRAM_API_KEY"])
response = dg.listen.rest.v("1").transcribe_file(
    {"model": "nova-2", "punctuate": True, "diarize": True},
    {"buffer": open("input.wav", "rb").read()}
)
```

**HF Ambient Classification (sampled from silent gaps):**
```python
from transformers import pipeline
classifier = pipeline("audio-classification", model="MIT/ast-finetuned-audioset-10-10-0.4593")
# Run on 10-second clips extracted from VAD silence timestamps
tags = classifier("silence_clip_001.wav", top_k=3)
# → [{"label": "Rain", "score": 0.87}, {"label": "Wind", "score": 0.42}]
```

**Groq Merge:**
```python
from groq import Groq
client = Groq(api_key=os.environ["GROQ_API_KEY"])
response = client.chat.completions.create(
    model="llama-3.1-8b-instant",
    messages=[{"role": "user", "content": MERGE_PROMPT}]
)
```

---

## 🏠 Stack 2: Fully Self-Hosted (Private + No API Costs)

**Best for:** Privacy-sensitive journals, offline/edge deployment, unlimited usage, no recurring costs.

### Hardware Requirements

| Component | Min RAM/VRAM | Recommended |
|-----------|--------------|-------------|
| Silero VAD | ~200 MB RAM | Any CPU |
| faster-whisper `large-v3` | ~3 GB VRAM (or 6 GB RAM in CPU mode) | NVIDIA GPU with 4+ GB VRAM |
| BEATs / AST | ~500 MB RAM | Any CPU |
| Qwen2.5-3B-Instruct (merge) | ~2 GB VRAM (4-bit) or 6 GB RAM (CPU) | NVIDIA GPU with 4+ GB VRAM |
| **TOTAL** | **~6 GB VRAM** | **~12 GB RAM (CPU-only) or 8 GB VRAM (GPU)** |

### Components

| Step | Component | Model | Notes |
|------|-----------|-------|-------|
| 1 | VAD | `silero-vad` | Same as cloud stack |
| 2 | Speech Transcription | `Systran/faster-whisper-large-v3` | CTranslate2-optimized, 4x faster than vanilla Whisper |
| 2 (alt) | Speech + Emotion (faster) | `FunAudioLLM/SenseVoiceSmall` | 234M params, native emotion tags, 15x faster than Whisper |
| 3 | Ambient Classification | `microsoft/beats` or `MIT/ast-finetuned-audioset-10-10-0.4593` | Runs on CPU in milliseconds |
| 4 | Merge + Emotion | `Qwen/Qwen2.5-3B-Instruct` via **Ollama** or **llama.cpp** | 3B params, runs on consumer hardware |

**Total cost:** $0.00 forever  
**Total wall-clock time:** ~15-45 min / hour (depends on hardware)

### Setup

```bash
# Install Ollama for the merge LLM
curl -fsSL https://ollama.com/install.sh | sh
ollama pull qwen2.5:3b

# Python dependencies
pip install faster-whisper silero-vad transformers torch pydub

# Alternative: use SenseVoiceSmall for faster speech+emotion
pip install funasr
```

### Key Code Snippets

**faster-whisper ASR:**
```python
from faster_whisper import WhisperModel
model = WhisperModel("large-v3", device="cuda", compute_type="float16")
# For CPU: device="cpu", compute_type="int8"
segments, info = model.transcribe("input.wav", beam_size=5, vad_filter=True)
# vad_filter=True uses built-in Silero VAD — skips silence automatically!
for segment in segments:
    print(f"[{segment.start:.2f} → {segment.end:.2f}] {segment.text}")
```

**SenseVoiceSmall (speech + emotion in one pass):**
```python
from funasr import AutoModel
model = AutoModel(
    model="iic/SenseVoiceSmall",
    vad_model="fsmn-vad",
    device="cuda:0"
)
result = model.generate(input="input.wav", language="auto", use_itn=True)
# Output includes: text, language, emotion tags (<|HAPPY|>, <|SAD|>, etc.), event tags
```

**Ollama Merge:**
```python
import requests
response = requests.post("http://localhost:11434/api/generate", json={
    "model": "qwen2.5:3b",
    "prompt": MERGE_PROMPT,
    "stream": False
})
```

---

## 📊 Stack Comparison

| Criteria | Stack 1: Hybrid Cloud | Stack 2: Self-Hosted |
|----------|----------------------|---------------------|
| **Setup complexity** | Low (API keys only) | Medium (model downloads, GPU setup) |
| **Cost per hour** | ~$0.26 (or $0 in free tier) | $0.00 |
| **Privacy** | Audio leaves device (Deepgram) | 100% local, never leaves device |
| **Speed (1-hr file)** | ~6 minutes | ~15-45 minutes (GPU), ~1-2 hours (CPU) |
| **ASR accuracy** | Excellent (Deepgram nova-2) | Very good (Whisper large-v3) |
| **Emotion detection** | LLM-inferred from text + pauses | Native (SenseVoice) or LLM-inferred |
| **Ambient accuracy** | Excellent (AST on HF) | Good (BEATs/AST local) |
| **Offline capable** | ❌ No | ✅ Yes |
| **Scales to many users** | ✅ Yes (cloud handles load) | ⚠️ Limited by your hardware |
| **Best for** | MVPs, SaaS, low-budget | Privacy-first, journals, edge |

---

## 🎯 Recommended Decision Tree

```
Is privacy a hard requirement?
├── YES → Stack 2 (Self-Hosted)
│         Do you have a GPU (4+ GB VRAM)?
│         ├── YES → faster-whisper + Qwen2.5-3B on GPU
│         └── NO  → faster-whisper (CPU int8) + Qwen2.5-3B (CPU)
└── NO  → Are you okay with API costs at scale?
          ├── YES → Stack 1 (Hybrid Cloud)
          └── NO  → Stack 1 with free-tier limits,
                    or Stack 2 for heavy usage
```

---

## 🔧 Universal Merge Prompt Template

Use this prompt for Step 4 in **both** stacks. It's designed for small LLMs (3B-8B) and works with Groq, Ollama, or any OpenAI-compatible endpoint.

```
You are a thoughtful journal synthesizer. You will receive three inputs:

1. VERBATIM TRANSCRIPT (with timestamps)
2. PAUSE/SILENCE MAP (with durations)
3. AMBIENT SOUND TAGS (with timestamps)

Your task: Write a cohesive, emotionally-aware journal entry that:
- Preserves the speaker's exact words where meaningful
- Captures the emotional weight of pauses (longer pauses = more reflection/weight)
- Weaves in the ambient environment as atmosphere, not distraction
- Uses natural prose, not bullet points or timestamps

Rules:
- Do NOT invent details not in the inputs
- Do NOT describe sounds that weren't detected
- If emotion is ambiguous, describe it as "contemplative" or "measured"
- Keep the ambient context subtle — it's the backdrop, not the focus

---
TRANSCRIPT:
{transcript}

PAUSES:
{pause_map}

AMBIENT:
{ambient_tags}

---
Journal entry:
```

---

## 📦 Environment Template (`.env.example`)

```bash
# Stack 1: Hybrid Cloud
DEEPGRAM_API_KEY=
GROQ_API_KEY=
HF_TOKEN=

# Stack 2: Self-Hosted
OLLAMA_HOST=http://localhost:11434
WHISPER_MODEL=large-v3          # or distil-large-v3 for speed
WHISPER_DEVICE=cuda             # or cpu
WHISPER_COMPUTE_TYPE=float16    # or int8 for CPU
SENSEVOICE_DEVICE=cuda:0        # if using SenseVoiceSmall instead
AMBIENT_MODEL=MIT/ast-finetuned-audioset-10-10-0.4593
MERGE_MODEL=qwen2.5:3b          # Ollama model name

# Shared
VAD_MODEL=silero                # or webrtcvad for zero-ML option
VAD_THRESHOLD=0.5               # speech probability threshold
AMBIENT_SAMPLE_COUNT=5          # how many silent clips to classify
AMBIENT_CLIP_DURATION=10        # seconds per ambient clip
```

---

## 🚀 Quick Start Checklist

- [ ] Choose your stack (Cloud vs. Self-Hosted)
- [ ] Copy `.env.example` → `.env` and fill in keys
- [ ] Run VAD on a test file → verify silence map JSON output
- [ ] Run ASR on a test file → verify transcript + timestamps
- [ ] Sample 3-5 silent clips → run ambient classifier → verify tags
- [ ] Combine all three into the merge prompt → verify journal output
- [ ] Wrap in a single `transcribe_journal(audio_path)` function
- [ ] Add batch processing for multiple files
- [ ] Add a simple CLI or web UI (Streamlit works great here)

---

## 📚 References

- [Silero VAD](https://github.com/snakers4/silero-vad)
- [faster-whisper](https://github.com/SYSTRAN/faster-whisper)
- [SenseVoiceSmall](https://huggingface.co/FunAudioLLM/SenseVoiceSmall)
- [AST AudioSet](https://huggingface.co/MIT/ast-finetuned-audioset-10-10-0.4593)
- [BEATs](https://github.com/microsoft/unilm/tree/master/beats)
- [Deepgram Docs](https://developers.deepgram.com/docs)
- [Groq Docs](https://console.groq.com/docs)
- [Ollama](https://ollama.com)
- [Qwen2.5](https://huggingface.co/Qwen/Qwen2.5-3B-Instruct)
```

### Notes on the file

- **Stack 1** uses Deepgram's free tier ($200 ≈ 460 hours) and Groq's free tier, so you can run hundreds of hours before paying anything.
- **Stack 2** is 100% free forever but needs a modest GPU to be fast. On CPU only, it still works — just slower.
- I included **SenseVoiceSmall as an alternative** to faster-whisper in the self-hosted stack because it gives you **native emotion tags** without needing the LLM to infer them — which matches your "emotion is very important" requirement perfectly.
- The merge prompt is tuned for small models (3B-8B) — it's explicit about what to do and what not to invent, which prevents hallucinations in smaller LLMs.
