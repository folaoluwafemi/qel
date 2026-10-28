/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@qel/design-system/src/tailwind-preset.js")],
  content: [
    "./entrypoints/**/*.{html,ts,tsx}",
    "../../packages/features/infinite-canvas/src/**/*.{ts,tsx}",
    "../../packages/design-system/src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
};
