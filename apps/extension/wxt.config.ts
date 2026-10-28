import { defineConfig } from "wxt";

export default defineConfig({
  extensionApi: "chrome",
  manifest: {
    name: "Qel — Knowledge Meets Agency",
    description: "Personal Cognitive OS: Omni-capture from anywhere on the web & 2D Infinite Thinking Canvas.",
    version: "0.1.0",
    permissions: ["activeTab", "storage", "contextMenus"],
    commands: {
      capture_page: {
        suggested_key: {
          default: "Ctrl+Shift+S",
          mac: "Command+Shift+S",
        },
        description: "Quick capture current tab or selection to Qel",
      },
    },
    chrome_url_overrides: {
      newtab: "entrypoints/newtab/index.html",
    },
  },
});
