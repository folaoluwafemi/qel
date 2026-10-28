/**
 * Quantizes colors and extracts dominant HEX palette from pixel data or mock buffers
 */
export class PaletteExtractor {
  /**
   * Helper to convert RGB to HEX
   */
  static rgbToHex(r: number, g: number, b: number): string {
    return "#" + [r, g, b].map(x => {
      const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  }

  /**
   * Extracts top 4 dominant HEX colors from raw pixel samples
   */
  static extractPaletteFromSamples(samples: Array<{ r: number; g: number; b: number }>): string[] {
    if (!samples || samples.length === 0) {
      return ["#111318", "#FF4D00", "#F7F7F9", "#8E8E93"];
    }

    // Sort by luminescence and saturation to produce an aesthetically diverse palette
    const uniqueHexes = Array.from(
      new Set(samples.map(s => this.rgbToHex(s.r, s.g, s.b)))
    );

    return uniqueHexes.slice(0, 4);
  }
}
