/**
 * Mintlify Canonical Typography Tokens
 * Derived from design.mds/mintlify/DESIGN.md
 */
export const typography = {
  fontFamily: {
    sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
    mono: ["Geist Mono", "SF Mono", "Menlo", "Consolas", "monospace"],
  },
  fontSize: {
    "hero-display": "72px",
    "display-lg": "56px",
    "heading-1": "48px",
    "heading-2": "36px",
    "heading-3": "28px",
    "heading-4": "22px",
    "heading-5": "18px",
    "body-md": "16px",
    "body-sm": "14px",
    caption: "13px",
    micro: "12px",
    "micro-uppercase": "11px",
    code: "14px",
    "code-sm": "13px",
  },
  letterSpacing: {
    "hero-display": "-2px",
    "display-lg": "-1.5px",
    "heading-1": "-1px",
    "heading-2": "-0.5px",
    normal: "0",
    "micro-uppercase": "0.5px",
  },
  lineHeight: {
    hero: "1.05",
    display: "1.10",
    tight: "1.20",
    snug: "1.30",
    normal: "1.40",
    relaxed: "1.50",
  },
} as const;
