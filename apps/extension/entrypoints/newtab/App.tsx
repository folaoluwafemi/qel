import React, { useState, useEffect } from "react";
import { CanvasRenderer } from "@qel/infinite-canvas";
import { Layout, Grid, Sparkles } from "@qel/design-system";

export function App() {
  const [viewMode, setViewMode] = useState<"canvas" | "stream">("canvas");

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      chrome.storage.local.get(["qel_newtab_mode"], (res) => {
        if (res.qel_newtab_mode) {
          setViewMode(res.qel_newtab_mode);
        }
      });
    }
  }, []);

  const handleToggleMode = (mode: "canvas" | "stream") => {
    setViewMode(mode);
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      chrome.storage.local.set({ qel_newtab_mode: mode });
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-canvas">
      {/* Top Floating View Switcher */}
      <div className="absolute top-5 right-6 z-40 flex items-center space-x-2 rounded-xl border border-hairline-strong bg-surface-card/90 p-1 shadow-2xl backdrop-blur-xl">
        <button
          onClick={() => handleToggleMode("canvas")}
          className={`flex items-center space-x-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            viewMode === "canvas"
              ? "bg-accent-orange text-black"
              : "text-ink-mute hover:text-ink hover:bg-surface-elevated"
          }`}
        >
          <Layout className="h-3.5 w-3.5" />
          <span>Canvas</span>
        </button>

        <button
          onClick={() => handleToggleMode("stream")}
          className={`flex items-center space-x-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            viewMode === "stream"
              ? "bg-accent-orange text-black"
              : "text-ink-mute hover:text-ink hover:bg-surface-elevated"
          }`}
        >
          <Grid className="h-3.5 w-3.5" />
          <span>mymind Stream</span>
        </button>
      </div>

      {/* Main View Area */}
      {viewMode === "canvas" ? (
        <CanvasRenderer />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
          <div className="flex items-center space-x-2 mb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-orange shadow-glow-orange animate-pulse" />
            <h2 className="font-serif text-2xl text-ink">Qel Sovereign Stream</h2>
          </div>
          <p className="text-xs text-ink-mute max-w-sm mb-4">
            Viewing your longitudinal cognitive stream. Open the full web app or switch back to the infinite thinking canvas anytime.
          </p>
          <a
            href="https://qel-web.folabuilds.workers.dev"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1.5 rounded-lg bg-surface-elevated border border-hairline px-4 py-2 text-xs text-accent-orange hover:border-accent-orange/60 transition-colors"
          >
            <Sparkles className="h-4 w-4" />
            <span>Launch Web App</span>
          </a>
        </div>
      )}
    </div>
  );
}
