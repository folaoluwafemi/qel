export type ArtifactModality =
  | "voice_memo"
  | "visual_pin"
  | "raw_image"
  | "raw_video"
  | "video_bookmark"
  | "web_clipping"
  | "raw_note"
  | "canvas_board"
  | "code_snippet"
  | "pdf_document";

export interface Artifact {
  id: string;
  userId: string;
  createdAt: string;
  recordedAt: string;
  modality: ArtifactModality;
  
  title?: string;
  rawText?: string;
  r2MediaKey?: string;
  r2MediaUrl?: string;
  sourceUrl?: string;
  
  // mymind Visual & Canvas Metadata
  dominantColors: string[]; // e.g. ['#111318', '#FF4D00', '#F7F7F9']
  ocrExtractedText?: string;
  readingModeHtml?: string;
  canvasSceneJson?: Record<string, any>;
  autoTags: string[];
  
  vectorId?: string;
}

export interface CreateArtifactInput {
  userId: string;
  recordedAt?: string;
  modality: ArtifactModality;
  title?: string;
  rawText?: string;
  r2MediaKey?: string;
  r2MediaUrl?: string;
  sourceUrl?: string;
  dominantColors?: string[];
  ocrExtractedText?: string;
  readingModeHtml?: string;
  canvasSceneJson?: Record<string, any>;
  autoTags?: string[];
}
