import { pgTable, uuid, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const artifacts = pgTable("artifacts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  recordedAt: timestamp("recorded_at", { withTimezone: true }).notNull().defaultNow(),
  modality: text("modality").notNull(), // 'voice_memo' | 'visual_pin' | 'raw_image' | 'raw_video' | 'video_bookmark' | 'web_clipping' | 'raw_note' | 'canvas_board' | 'code_snippet' | 'pdf_document'
  
  // Content & Storage
  title: text("title"),
  rawText: text("raw_text"),
  r2MediaKey: text("r2_media_key"),
  r2MediaUrl: text("r2_media_url"),
  sourceUrl: text("source_url"),
  
  // mymind Visual & Canvas Metadata
  dominantColors: text("dominant_colors").array(),
  ocrExtractedText: text("ocr_extracted_text"),
  readingModeHtml: text("reading_mode_html"),
  canvasSceneJson: jsonb("canvas_scene_json"),
  autoTags: text("auto_tags").array(),
  
  vectorId: text("vector_id"),
});

export type ArtifactSelect = typeof artifacts.$inferSelect;
export type ArtifactInsert = typeof artifacts.$inferInsert;
