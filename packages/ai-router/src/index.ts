import { GroqAdapter } from "./adapters/groq";
import { LocalProsodyExtractor } from "./adapters/local-prosody";

export * from "./types";
export * from "./adapters/groq";
export * from "./adapters/local-prosody";

export class AiRouter {
  public groq: GroqAdapter;
  public prosody: LocalProsodyExtractor;

  constructor(groqApiKey?: string) {
    this.groq = new GroqAdapter(groqApiKey);
    this.prosody = new LocalProsodyExtractor();
  }
}
