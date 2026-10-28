import type { ProsodyExtractionResponse } from "../types";

export class LocalProsodyExtractor {
  /**
   * Calculates speech cadence, estimated vocal fatigue, and epiphany extraction from audio metrics & transcript
   */
  extractProsody(transcript: string, durationSeconds: number, recordingTimestamp?: Date): ProsodyExtractionResponse {
    const wordCount = transcript.trim().split(/\s+/).filter(Boolean).length;
    const durationMinutes = Math.max(durationSeconds / 60, 0.1);
    const speechRateWpm = Math.round(wordCount / durationMinutes);

    // Analyze circadian nadir (late night recording indicator: 1:00 AM - 5:00 AM)
    let fatigueScore = 0.2; // default rested
    if (recordingTimestamp) {
      const hour = recordingTimestamp.getHours();
      if (hour >= 1 && hour <= 5) {
        fatigueScore += 0.45; // late night penalty
      }
    }

    // Slow speech pace indicates fatigue or reflective vulnerability (<110 WPM)
    if (speechRateWpm < 110) {
      fatigueScore += 0.25;
    } else if (speechRateWpm > 170) {
      // Very fast pace indicates manic / high-excitation state
      fatigueScore += 0.15;
    }
    fatigueScore = Math.min(Math.max(fatigueScore, 0.0), 1.0);

    // Heuristic epiphany pull-quote extractor (sentences with inflection signals)
    const sentences = transcript.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 20);
    const epiphanyKeywords = ["realized", "epiphany", "aha", "finally", "insight", "truth is", "learned", "understand now", "what if"];
    
    const epiphanyQuotes = sentences.filter(sentence => 
      epiphanyKeywords.some(keyword => sentence.toLowerCase().includes(keyword))
    ).slice(0, 3);

    return {
      speechRateWpm,
      pitchVarianceHz: 45, // baseline
      vocalEnergyRms: 0.65,
      fatigueScore,
      epiphanyQuotes: epiphanyQuotes.length > 0 ? epiphanyQuotes : (sentences.length > 0 ? [sentences[0]] : []),
    };
  }
}
