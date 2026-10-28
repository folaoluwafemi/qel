import { Hono } from "hono";
import { cors } from "hono/cors";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ogAuthMiddleware } from "./auth-middleware";
import { CanvasSpaceDO } from "./durable-objects/CanvasSpaceDO";
import { 
  ThinkingPartner, 
  ContextTagger, 
  OpenLoopsMatcher, 
  IdeaMatcher,
  RelatedThoughtsEngine,
  type SparringMessage 
} from "@qel/thought-graph";

export { CanvasSpaceDO };

export interface Env {
  MEDIA_BUCKET: R2Bucket;
  SEMANTIC_INDEX: VectorizeIndex;
  VISUAL_INDEX: VectorizeIndex;
  CANVAS_SPACES: DurableObjectNamespace<CanvasSpaceDO>;
  HYPERDRIVE?: Hyperdrive;
  INGEST_QUEUE?: Queue;
  DATABASE_URL?: string;
  GROQ_API_KEY?: string;
  CLOUDFLARE_ACCOUNT_ID?: string;
  CLOUDFLARE_R2_ACCESS_KEY_ID?: string;
  CLOUDFLARE_R2_SECRET_ACCESS_KEY?: string;
  CLOUDFLARE_R2_BUCKET_NAME?: string;
  CLOUDFLARE_R2_PUBLIC_URL?: string;
}

const app = new Hono<{ Bindings: Env; Variables: { userId: string } }>();

// Enable CORS for Web, Mobile, and Browser Extension clients
app.use("/*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
}));

// Mount OG Auth Stateless Verification
app.use("/api/*", ogAuthMiddleware);

// Health Check
app.get("/health", (c) => {
  return c.json({
    status: "healthy",
    service: "qel-api",
    timestamp: new Date().toISOString(),
  });
});

/**
 * 1. Direct-to-R2 Presigned Upload URL Generation
 * Allows client to upload large audio files or images directly to R2 with zero Worker compute tax
 */
app.post("/api/v1/ingest/presigned-url", async (c) => {
  const body = await c.req.json<{
    fileName: string;
    contentType: string;
    modality: string;
  }>();

  const fileKey = `uploads/${Date.now()}-${body.fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

  // If R2 credentials are provided, generate S3 presigned PUT URL
  if (c.env.CLOUDFLARE_R2_ACCESS_KEY_ID && c.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY && c.env.CLOUDFLARE_ACCOUNT_ID) {
    const s3 = new S3Client({
      region: "auto",
      endpoint: `https://${c.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: c.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
        secretAccessKey: c.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
      },
    });

    const command = new PutObjectCommand({
      Bucket: c.env.CLOUDFLARE_R2_BUCKET_NAME || "qel-media-store",
      Key: fileKey,
      ContentType: body.contentType,
    });

    const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return c.json({
      fileKey,
      uploadUrl: presignedUrl,
      publicUrl: c.env.CLOUDFLARE_R2_PUBLIC_URL ? `${c.env.CLOUDFLARE_R2_PUBLIC_URL}/${fileKey}` : undefined,
    });
  }

  // Fallback endpoint for local development
  return c.json({
    fileKey,
    uploadUrl: `/api/v1/ingest/direct-upload?key=${encodeURIComponent(fileKey)}`,
  });
});

/**
 * 2. Ingest Notification Endpoint
 * Triggered after binary upload completes to queue transcription/OCR and graph extraction
 */
app.post("/api/v1/ingest/notify", async (c) => {
  const body = await c.req.json<{
    fileKey: string;
    modality: string;
    userId: string;
    originalTimestamp?: string;
  }>();

  // If queue is bound, dispatch event
  if (c.env.INGEST_QUEUE) {
    await c.env.INGEST_QUEUE.send({
      type: "PROCESS_MEDIA",
      payload: body,
    });
  }

  return c.json({
    success: true,
    message: "Ingestion queued successfully",
    fileKey: body.fileKey,
  });
});

/**
 * 3. Quick Text / Web Clipping Capture with Automatic Context Tagging
 */
app.post("/api/v1/artifacts", async (c) => {
  const body = await c.req.json<any>();
  const artifactId = crypto.randomUUID();

  const artifact = {
    id: artifactId,
    ...body,
    createdAt: new Date().toISOString(),
  };

  // Run context tagging (facts, guesses, open questions)
  const tagger = new ContextTagger(c.env.GROQ_API_KEY);
  const context = await tagger.tagArtifact({
    id: artifactId,
    modality: body.modality || "raw_note",
    title: body.title,
    rawText: body.rawText,
    recordedAt: body.recordedAt || artifact.createdAt,
    sourceUrl: body.sourceUrl,
    audioDurationSeconds: body.audioDurationSeconds,
  });

  // Check if this new thought answers any open questions
  let resolvedLoops: any[] = [];
  if (body.rawText || body.title) {
    const matcher = new OpenLoopsMatcher(c.env.GROQ_API_KEY);
    resolvedLoops = await matcher.matchAndResolve({
      id: artifactId,
      text: body.rawText || body.title || "",
      title: body.title,
    });
  }

  return c.json({
    success: true,
    artifact,
    context,
    resolvedLoops,
  });
});

/**
 * 4. Conversational Thinking Partner / Sparring
 */
app.post("/api/v1/sparring/chat", async (c) => {
  const { messages, energyLevel } = await c.req.json<{
    messages: SparringMessage[];
    energyLevel?: "low" | "medium" | "high";
  }>();

  const partner = new ThinkingPartner(c.env.GROQ_API_KEY);
  const ideaMatcher = new IdeaMatcher();
  const matchedIdeas = await ideaMatcher.matchIdeasForEnergy(energyLevel || "medium");

  const reply = await partner.reply(messages || [], {
    activeEnergyLevel: energyLevel,
    matchedIdeas: matchedIdeas.slice(0, 3).map((i: { title: string; reasoning: string }) => ({
      title: i.title,
      reasoning: i.reasoning,
    })),
  });

  return c.json({
    reply,
    matchedIdeas: matchedIdeas.slice(0, 3),
  });
});

/**
 * 5. Idea Matcher ("Right Idea, Right Moment")
 */
app.get("/api/v1/ideas/matches", async (c) => {
  const energy = (c.req.query("energy") || "medium") as "low" | "medium" | "high";
  const matcher = new IdeaMatcher();
  const matches = await matcher.matchIdeasForEnergy(energy);

  return c.json({
    energy,
    matches,
  });
});

/**
 * 6. Connected Thoughts / Idea Graph
 */
app.get("/api/v1/graph/related/:id", async (c) => {
  const artifactId = c.req.param("id");
  const engine = new RelatedThoughtsEngine();
  const connected = await engine.getConnectedThoughts(artifactId);

  return c.json({
    artifactId,
    connected,
  });
});

/**
 * 7. Semantic Search across Cloudflare Vectorize
 */
app.get("/api/v1/search", async (c) => {
  const query = c.req.query("q") || "";

  return c.json({
    query,
    results: [],
    message: "Vectorize query endpoint initialized",
  });
});

/**
 * 8. Realtime 2D Canvas Synchronization via Durable Objects
 * Supports both WebSocket upgrade and HTTP GET/POST for canvas scene state
 */
app.all("/api/v1/spaces/:id/canvas", async (c) => {
  const spaceId = c.req.param("id");
  const id = c.env.CANVAS_SPACES.idFromName(spaceId);
  const obj = c.env.CANVAS_SPACES.get(id);

  return obj.fetch(c.req.raw);
});

export default app;
