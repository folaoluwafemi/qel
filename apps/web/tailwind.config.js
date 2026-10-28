/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@qel/design-system/src/tailwind-preset.js")],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/design-system/src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
};
