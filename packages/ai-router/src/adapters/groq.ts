import Groq from "groq-sdk";
import type { AudioTranscribeResponse, ReasoningStreamRequest } from "../types";

export class GroqAdapter {
  private client: Groq | null = null;
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GROQ_API_KEY;
    if (this.apiKey) {
      this.client = new Groq({ apiKey: this.apiKey });
    }
  }

  private getClient(): Groq {
    if (!this.client) {
      const key = this.apiKey || process.env.GROQ_API_KEY;
      if (!key) {
        throw new Error("GROQ_API_KEY is missing. Please set it in your .env file.");
      }
      this.client = new Groq({ apiKey: key });
    }
    return this.client;
  }

  /**
   * High-speed audio transcription via Groq Whisper Large v3
   */
  async transcribeAudio(file: File | any): Promise<AudioTranscribeResponse> {
    const client = this.getClient();
    const transcription = await client.audio.transcriptions.create({
      file,
      model: "whisper-large-v3-turbo",
      response_format: "verbose_json",
      timestamp_granularities: ["segment"],
    });

    const result = transcription as any;
    return {
      text: result.text || "",
      durationSeconds: result.duration,
      segments: result.segments?.map((s: any) => ({
        start: s.start,
        end: s.end,
        text: s.text,
      })),
    };
  }

  /**
   * Fast reasoning and conversational sparring stream
   */
  async streamReasoning(
    request: ReasoningStreamRequest,
    onToken: (token: string) => void
  ): Promise<string> {
    const client = this.getClient();
    const stream = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: request.systemPrompt },
        ...request.messages,
      ],
      temperature: request.temperature ?? 0.7,
      max_tokens: request.maxTokens ?? 2048,
      stream: true,
    });

    let fullResponse = "";
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        fullResponse += content;
        onToken(content);
      }
    }

    return fullResponse;
  }
}
