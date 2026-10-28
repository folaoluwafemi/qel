"use client";

import React from "react";
import { Mic, Eye, Layout, Brain, Sparkles, Terminal, Palette, Zap, ArrowRight } from "@qel/design-system";

export function FeaturesGrid() {
  return (
    <section id="omni-capture" className="py-24 border-b border-hairline bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-mint font-semibold">
            Product Infrastructure
          </span>
          <h2 className="mt-3 font-sans text-3xl sm:text-5xl font-semibold text-ink tracking-[-1px]">
            Built for high-agency thinking.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-ink-steel leading-relaxed">
            Zero friction on capture. Deep synthesis on retrieval. Spatial arrangement on demand.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="rounded-xl border border-hairline bg-surface p-8 text-left hover:border-hairline-strong transition-colors">
            <div className="flex items-center justify-between mb-6">
              <span className="h-10 w-10 rounded-xl bg-white border border-hairline flex items-center justify-center text-mint shadow-xs">
                <Mic className="h-5 w-5" />
              </span>
              <span className="font-mono text-[11px] text-ink-stone uppercase tracking-wider font-semibold">
                Pillar 01
              </span>
            </div>

            <h3 className="font-sans text-2xl font-semibold text-ink">
              Sensory Omni-Capture
            </h3>

            <p className="mt-3 text-sm text-ink-steel leading-relaxed">
              Backfill 2+ years of unconstrained voice memos using Groq Whisper Large v3 turbo. Scrape Pinterest boards to model your subconscious visual taste, and capture web context with the global shortcut <code className="font-mono text-xs bg-white px-1.5 py-0.5 rounded border border-hairline text-ink">Cmd+Shift+S</code>.
            </p>

            <div className="mt-6 pt-6 border-t border-hairline flex items-center space-x-4 text-xs text-ink-steel font-medium">
              <span className="flex items-center space-x-1.5">
                <Sparkles className="h-3.5 w-3.5 text-mint" />
                <span>Prosody & Fatigue Extraction</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Palette className="h-3.5 w-3.5 text-brand-tag" />
                <span>4-Color Hex Extraction</span>
              </span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="rounded-xl border border-hairline bg-surface p-8 text-left hover:border-hairline-strong transition-colors">
            <div className="flex items-center justify-between mb-6">
              <span className="h-10 w-10 rounded-xl bg-white border border-hairline flex items-center justify-center text-brand-tag shadow-xs">
                <Eye className="h-5 w-5" />
              </span>
              <span className="font-mono text-[11px] text-ink-stone uppercase tracking-wider font-semibold">
                Pillar 02
              </span>
            </div>

            <h3 className="font-sans text-2xl font-semibold text-ink">
              Pure Visual Stream (mymind Ethos)
            </h3>

            <p className="mt-3 text-sm text-ink-steel leading-relaxed">
              No folders, no directories, zero filing guilt. An infinite, serene visual stream of raw waveforms, image pins, distraction-free reading articles, and thoughts. Filter by color palette, search by screenshot OCR, and enjoy gentle serendipity sparks.
            </p>

            <div className="mt-6 pt-6 border-t border-hairline flex items-center space-x-4 text-xs text-ink-steel font-medium">
              <span className="flex items-center space-x-1.5">
                <Sparkles className="h-3.5 w-3.5 text-mint" />
                <span>Color Palette Search</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Sparkles className="h-3.5 w-3.5 text-mint" />
                <span>Zero Filing Anxiety</span>
              </span>
            </div>
          </div>

          {/* Feature 3 */}
          <div id="canvas" className="rounded-xl border border-hairline bg-surface p-8 text-left hover:border-hairline-strong transition-colors">
            <div className="flex items-center justify-between mb-6">
              <span className="h-10 w-10 rounded-xl bg-white border border-hairline flex items-center justify-center text-mint shadow-xs">
                <Layout className="h-5 w-5" />
              </span>
              <span className="font-mono text-[11px] text-ink-stone uppercase tracking-wider font-semibold">
                Pillar 03
              </span>
            </div>

            <h3 className="font-sans text-2xl font-semibold text-ink">
              2D Infinite Thinking Canvas
            </h3>

            <p className="mt-3 text-sm text-ink-steel leading-relaxed">
              A hybrid of Milanote and Excalidraw built directly into your browser's New Tab page. Freeform spatial arrangement of thoughts, links, and visual pins with directional Bézier arrow connectors (<code className="font-mono text-xs bg-white px-1.5 py-0.5 rounded border border-hairline text-ink">lead_up_to</code>, <code className="font-mono text-xs bg-white px-1.5 py-0.5 rounded border border-hairline text-ink">reinforces</code>).
            </p>

            <div className="mt-6 pt-6 border-t border-hairline flex items-center space-x-4 text-xs text-ink-steel font-medium">
              <span className="flex items-center space-x-1.5">
                <Sparkles className="h-3.5 w-3.5 text-mint" />
                <span>Cloudflare Durable Objects</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Sparkles className="h-3.5 w-3.5 text-mint" />
                <span>Clean, Zero Dummy State</span>
              </span>
            </div>
          </div>

          {/* Feature 4 */}
          <div id="thinking-partner" className="rounded-xl border border-hairline bg-surface p-8 text-left hover:border-hairline-strong transition-colors">
            <div className="flex items-center justify-between mb-6">
              <span className="h-10 w-10 rounded-xl bg-white border border-hairline flex items-center justify-center text-primary shadow-xs">
                <Brain className="h-5 w-5" />
              </span>
              <span className="font-mono text-[11px] text-ink-stone uppercase tracking-wider font-semibold">
                Pillar 04
              </span>
            </div>

            <h3 className="font-sans text-2xl font-semibold text-ink">
              The Sovereign Thinking Partner
            </h3>

            <p className="mt-3 text-sm text-ink-steel leading-relaxed">
              A peer-level sparring AI with zero corporate pleasantries. Distinguishes verified facts from humble inferences, quietly connects future notes to old unanswered questions, and features the <strong>Dynamic Idea Matcher</strong> to pair your 17+ backlog ideas with your active energy state.
            </p>

            <div className="mt-6 pt-6 border-t border-hairline flex items-center space-x-4 text-xs text-ink-steel font-medium">
              <span className="flex items-center space-x-1.5">
                <Zap className="h-3.5 w-3.5 text-mint" />
                <span>Dynamic Idea Triage</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Sparkles className="h-3.5 w-3.5 text-mint" />
                <span>Silent Open Loop Resolution</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
