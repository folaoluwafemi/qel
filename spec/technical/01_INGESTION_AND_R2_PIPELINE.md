# Technical Spec 01: Ingestion & Cloudflare R2 Pipeline

> *"High-throughput, asynchronous multi-modal ingestion with direct-to-R2 uploads and Cloudflare Queues."*

---

## 1. Direct-to-R2 Upload Architecture

To prevent heavy audio files (20-minute voice memos) or high-res visual assets from choking API Workers, Qel uses **Direct-to-R2 Presigned Upload URLs**:

```
 ┌──────────────┐                  ┌────────────────────────┐                  ┌───────────────┐
 │    Client    │─── 1. Request ──►│   Cloudflare Worker    │                  │ Cloudflare R2 │
 │ (Mobile/Ext) │    Upload URL    │   (Auth & Key Gen)     │                  │  Object Store │
 │              │◄── 2. Presigned ─│                        │                  │               │
 │              │       PUT URL    └────────────────────────┘                  │               │
 │              │                                                              │               │
 │              │─── 3. Direct Binary Upload (PUT .m4a / .jpg) ───────────────►│               │
 │              │                                                              │               │
 │              │─── 4. Ingest Notification (Trigger Queue) ──►[Worker Queue]─►│               │
 └──────────────┘                                                              └───────────────┘
```

### 1.1 Presigned URL Generation Endpoint
* **Endpoint**: `POST /api/v1/ingest/upload-url`
* **Request Payload**:
  ```json
  {
    "file_type": "audio/m4a",
    "byte_size": 18450200,
    "client_timestamp": "2026-08-28T02:30:00Z",
    "modality": "voice_memo"
  }
  ```
* **Worker Execution**:
  * Authenticates request via JWT / API key.
  * Generates an AWS S3-compatible presigned PUT URL using `@aws-sdk/s3-request-presigner` against Cloudflare R2 credentials.
  * Returns presigned URL and unique `artifact_id`.

---

## 2. Cloudflare Queues: Asynchronous Multi-Modal Pipelines

Once the client finishes binary upload to R2, it posts an event to `ingest-queue`. Cloudflare Queues ensures zero dropped messages, automatic retries, and decoupled processing.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                       CLOUDFLARE QUEUES INGESTION WORKER                 │
└────────────────────────────────────┬─────────────────────────────────────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         ▼                           ▼                           ▼
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│  AUDIO PIPELINE  │       │ VISUAL PIPELINE  │       │  TEXT PIPELINE   │
│ • Whisper/Gemini │       │ • Pinterest Pin  │       │ • Browser Ext.   │
│   Transcription  │       │   Scraper        │       │ • Reader Mode    │
│ • Prosody & WPM  │       │ • Color Palette  │       │ • HTML Cleanup   │
│ • Vocal Fatigue  │       │ • OCR Text (Tess)│       │ • Annotation Link│
└────────┬─────────┘       └────────┬─────────┘       └────────┬─────────┘
         │                          │                          │
         └──────────────────────────┼──────────────────────────┘
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                      META-CONTEXT ENVELOPE GENERATOR                     │
│  • Compiles Ground Truth, Inferences, Epistemic Voids                    │
│  • Generates 1536-d Semantic Embedding -> Cloudflare Vectorize           │
│  • Writes Record -> PostgreSQL / D1                                      │
│  • Pushes to Epistemic Void Matcher Queue                                │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Deep Pipeline Specifications

### 3.1 Audio Ingestion & Acoustic Feature Extraction
* **Step 1: Transcription**: Audio stream sent to Whisper API / Gemini Multimodal Audio.
* **Step 2: Acoustic Prosody Calculation**:
  * *Speech Rate*: $\text{WPM} = \frac{\text{Word Count}}{\text{Duration (minutes)}}$
  * *Pause Ratio*: $\frac{\text{Silence Duration}}{\text{Total Duration}}$
  * *Vocal Energy Level*: RMS amplitude variance over time.
  * *Circadian Phase*: Inferred from local recording timestamp (e.g. 02:30 = Nadir).

### 3.2 Visual & Pinterest Ingestion Pipeline
* **Step 1: Ingestion**: Accepts direct image upload or Pinterest board URL.
* **Step 2: Color Palette Extraction**: K-Means clustering on pixel arrays to extract the top 4 dominant HEX color codes (e.g. `['#111318', '#FF4D00', '#F7F7F9', '#8E8E93']`).
* **Step 3: OCR Text Recognition**: Extracts embedded typography, quotes, and diagrams into searchable text.
* **Step 4: Multi-Modal Embeddings**: Generates visual embeddings using SigLIP / CLIP models and saves to Cloudflare Vectorize.

### 3.3 The 2-Year Archive Batch Backfill CLI
* A standalone Node.js / TypeScript script to process historical files:
  ```bash
  pnpm run backfill:voice --source="./archive/voice_memos" --concurrency=5
  ```
* Uploads raw `.m4a` files to R2, preserves original creation timestamps, and triggers the queue worker in parallel batches.
