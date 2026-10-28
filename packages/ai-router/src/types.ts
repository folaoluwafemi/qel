export interface AudioTranscribeRequest {
  audioBlob: Blob | Buffer;
  fileName?: string;
  language?: string;
}

export interface AudioTranscribeResponse {
  text: string;
  durationSeconds?: number;
  segments?: Array<{
    start: number;
    end: number;
    text: string;
  }>;
}

export interface ProsodyExtractionResponse {
  speechRateWpm: number;
  pitchVarianceHz: number;
  vocalEnergyRms: number;
  fatigueScore: number; // 0.0 to 1.0
  epiphanyQuotes: string[];
}

export interface VisionAnalysisResponse {
  dominantColors: string[]; // e.g. ['#111318', '#FF4D00', '#F7F7F9']
  ocrText?: string;
  aestheticTags: string[];
  visualVector?: number[]; // 512-d or 768-d
}

export interface ReasoningStreamRequest {
  systemPrompt: string;
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>;
  temperature?: number;
  maxTokens?: number;
}
