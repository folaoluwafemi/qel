"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Mic, Move, Brain, Terminal, Check } from "@qel/design-system";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 border-b border-hairline bg-gradient-to-b from-[#87a8c8]/25 via-[#f5e9d8]/30 to-white">
      <div className="mx-auto max-w-7xl px-6 text-center">
        {/* Mintlify Badge Pill */}
        <div className="inline-flex items-center space-x-2 rounded-full border border-hairline bg-white/80 px-4 py-1.5 text-xs backdrop-blur-md mb-8 shadow-xs">
          <span className="h-2 w-2 rounded-full bg-mint shadow-mint-glow animate-pulse" />
          <span className="font-sans font-medium text-ink">Qel Cognitive OS</span>
          <span className="text-hairline">·</span>
          <span className="font-mono text-ink-steel text-[11px]">Mintlify Architecture</span>
        </div>

        {/* Hero Title - Inter 72px 600 -2px tracking */}
        <h1 className="mx-auto max-w-5xl font-sans text-4xl sm:text-6xl md:text-[72px] font-semibold tracking-[-2px] text-ink leading-[1.05]">
          The Intelligent Knowledge Platform <br />
          <span className="text-mint">for Sovereign Minds.</span>
        </h1>

        {/* Subtitle - Inter 18px 400 */}
        <p className="mx-auto mt-6 max-w-2xl font-sans text-base sm:text-lg text-ink-steel leading-relaxed font-normal">
          Capture raw thought across 2-year voice archives, visual taste, and web clippings.
          Eliminate the <strong className="text-ink font-medium">Planning Tax</strong> with an authentic thinking partner that turns latent epiphanies into reality.
        </p>

        {/* Mintlify Signature Button Pairing */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/app"
            className="flex w-full sm:w-auto items-center justify-center space-x-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-white hover:bg-ink-charcoal shadow-sm active:scale-98 transition-all"
          >
            <span>Get Started Free</span>
            <ArrowRight className="h-4 w-4 text-mint" />
          </Link>

          <a
            href="https://og-auth.folabuilds.workers.dev/login"
            className="flex w-full sm:w-auto items-center justify-center space-x-2 rounded-full bg-mint px-7 py-3.5 text-sm font-medium text-primary hover:bg-mint-deep shadow-mint-glow active:scale-98 transition-all"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Sign In with OG Auth</span>
          </a>
        </div>

        {/* Hero Product Mockup - 3-Column Developer Layout */}
        <div className="mt-16 md:mt-24 mx-auto max-w-5xl rounded-xl border border-hairline bg-white shadow-hero-card overflow-hidden text-left">
          {/* Mockup Header Bar */}
          <div className="border-b border-hairline bg-surface px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-3 font-mono text-xs text-ink-steel">qel.app/workspace/sovereign-space</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="inline-flex items-center space-x-1 rounded-full bg-mint/15 px-2 py-0.5 font-mono text-[10px] text-mint font-medium">
                <span>●</span>
                <span>Active Inference</span>
              </span>
            </div>
          </div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-hairline bg-white">
            {/* Column 1: Voice Ingestion */}
            <div className="p-6">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-mono uppercase tracking-wider text-[11px] text-mint font-semibold">
                  Voice Checkpoint
                </span>
                <span className="font-mono text-xs text-ink-steel">2:40 AM</span>
              </div>
              <h4 className="font-sans text-sm font-medium text-ink leading-snug">
                "Agency is closing the gap between latent thought and reality."
              </h4>
              <div className="my-4 flex items-center space-x-1 h-8 px-2 rounded-md bg-surface border border-hairline">
                {[30, 60, 45, 90, 75, 40, 65, 80, 50, 95, 70, 40, 85, 60, 30].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}%` }}
                    className="flex-1 rounded-full bg-mint"
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="rounded bg-surface px-2 py-0.5 font-mono text-[10px] text-ink-steel">#epiphany</span>
                <span className="rounded bg-mint/10 text-mint px-2 py-0.5 font-mono text-[10px] font-medium">Verified Fact (1.0)</span>
              </div>
            </div>

            {/* Column 2: 2D Spatial Canvas */}
            <div className="p-6 bg-surface-soft">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-mono uppercase tracking-wider text-[11px] text-brand-tag font-semibold">
                  Infinite Canvas
                </span>
                <span className="font-mono text-xs text-ink-steel">Spatial Map</span>
              </div>
              <div className="rounded-lg border border-hairline bg-white p-3.5 shadow-xs mb-3">
                <span className="font-mono text-[10px] text-ink-steel block mb-1">NODE A → B</span>
                <p className="font-sans text-xs text-ink">
                  Curated Pinterest aesthetics mapped to product architecture.
                </p>
                <div className="mt-2 flex h-2 w-full rounded overflow-hidden">
                  <span className="flex-1 bg-[#111318]" />
                  <span className="flex-1 bg-[#00d4a4]" />
                  <span className="flex-1 bg-[#3772cf]" />
                  <span className="flex-1 bg-[#f55a3c]" />
                </div>
              </div>
              <div className="flex items-center space-x-1 text-xs text-mint">
                <Check className="h-3.5 w-3.5" />
                <span className="font-sans text-[11px] text-ink-steel">Bézier arrow link confirmed</span>
              </div>
            </div>

            {/* Column 3: The Thinking Partner (Dark Developer Code Surface) */}
            <div className="p-6 bg-surface-code text-white">
              <div className="flex items-center justify-between text-xs mb-3 text-ink-onDarkMuted">
                <span className="font-mono uppercase tracking-wider text-[11px] text-mint font-semibold flex items-center space-x-1">
                  <Brain className="h-3.5 w-3.5" />
                  <span>Thinking Partner</span>
                </span>
                <span className="font-mono text-[10px] text-mint">Online</span>
              </div>
              <div className="space-y-2.5 font-mono text-xs text-ink-onDark leading-relaxed">
                <p className="text-[#a8a8aa]">
                  &gt; Evaluating backlog against current energy:
                </p>
                <div className="rounded border border-hairline-dark bg-[#141416] p-2.5 text-mint text-[11px]">
                  <strong>Match:</strong> Minimalist Palette Browser
                  <span className="block text-[#a8a8aa] mt-0.5">Low friction · Perfect for current energy</span>
                </div>
                <p className="text-[11px] text-[#888888]">
                  Open question tracked: <em>"Did client sign the pilot?"</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
