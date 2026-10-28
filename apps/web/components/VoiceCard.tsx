"use client";

import React, { useState } from "react";
import { Mic, Play, Pause, Sparkles, Clock } from "@qel/design-system";
import type { Artifact } from "@qel/core";

export function VoiceCard({ artifact }: { artifact: Artifact }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="group relative rounded-xl border border-[#e5e5e5] bg-white p-5 transition-all duration-200 hover:border-[#00d4a4]/60 hover:shadow-hero-card">
      {/* Header with Type & Duration */}
      <div className="flex items-center justify-between text-xs text-[#5a5a5c]">
        <div className="flex items-center space-x-1.5 text-[#00d4a4] font-semibold">
          <Mic className="h-3.5 w-3.5" />
          <span className="tracking-wide text-[11px] uppercase">Voice Journal</span>
        </div>
        <div className="flex items-center space-x-1 text-[#888888]">
          <Clock className="h-3 w-3" />
          <span>{new Date(artifact.recordedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Epiphany or Core Excerpt */}
      <div className="mt-3.5">
        <p className="font-sans text-base font-medium leading-snug text-[#0a0a0a]">
          "{artifact.title || artifact.rawText?.slice(0, 120)}..."
        </p>
      </div>

      {/* Interactive Waveform Bar & Playback */}
      <div className="mt-4 flex items-center space-x-3 rounded-xl bg-[#f7f7f7] p-2.5">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0a0a0a] text-white transition-transform active:scale-95 hover:bg-[#1c1c1e]"
        >
          {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current translate-x-0.5" />}
        </button>

        {/* Dynamic Simulated Waveform Bars */}
        <div className="flex flex-1 items-center space-x-0.5 overflow-hidden h-6">
          {[40, 70, 30, 90, 60, 45, 80, 100, 35, 60, 75, 40, 85, 95, 50, 65, 80, 45, 90, 30].map((h, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-300 ${
                isPlaying ? "bg-[#00d4a4] animate-pulse" : "bg-[#e5e5e5]"
              }`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      {/* Tags / Epistemic Context */}
      {artifact.autoTags && artifact.autoTags.length > 0 && (
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {artifact.autoTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#f7f7f7] border border-[#e5e5e5] px-2.5 py-0.5 text-[11px] font-mono text-[#5a5a5c]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
