/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0a0a0a",
          foreground: "#ffffff",
        },
        mint: {
          DEFAULT: "#00d4a4",
          deep: "#00b48a",
          soft: "#7cebcb",
        },
        brand: {
          green: "#00d4a4",
          tag: "#3772cf",
          warn: "#c37d0d",
          error: "#d45656",
          annotate: "#1ba673",
        },
        hero: {
          skyFrom: "#87a8c8",
          skyTo: "#f5e9d8",
          darkFrom: "#1a3d4a",
          darkTo: "#2d5a4f",
        },
        testimonial: {
          orange: "#f55a3c",
          orangeDeep: "#cc3a1f",
        },
        canvas: {
          DEFAULT: "#ffffff",
          dark: "#0a0a0a",
        },
        surface: {
          DEFAULT: "#f7f7f7",
          soft: "#fafafa",
          card: "#ffffff",
          code: "#1c1c1e",
          elevated: "#ffffff",
        },
        hairline: {
          DEFAULT: "#e5e5e5",
          soft: "#ededed",
          dark: "#1f1f1f",
          strong: "#d4d4d4",
        },
        ink: {
          DEFAULT: "#0a0a0a",
          charcoal: "#1c1c1e",
          slate: "#3a3a3c",
          steel: "#5a5a5c",
          stone: "#888888",
          muted: "#a8a8aa",
          onDark: "#ffffff",
          onDarkMuted: "#b3b3b3",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["Geist Mono", "SF Mono", "Menlo", "Consolas", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        xxl: "24px",
        full: "9999px",
      },
      boxShadow: {
        "mint-glow": "0 4px 20px rgba(0, 212, 164, 0.25)",
        "card-soft": "0 8px 24px rgba(0, 0, 0, 0.04)",
        "hero-card": "0 24px 48px -8px rgba(0, 0, 0, 0.12)",
      },
    },
  },
};
