"use client";

import React from "react";
import { X, Check, ArrowRight, Sparkles } from "@qel/design-system";

export function ProblemSection() {
  return (
    <section id="philosophy" className="py-24 border-b border-hairline bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-mint font-semibold">
            The Philosophy
          </span>
          <h2 className="mt-3 font-sans text-3xl sm:text-5xl font-semibold text-ink tracking-[-1px] leading-tight">
            The "Planning Tax" is killing your best ideas.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-ink-steel leading-relaxed font-normal">
            Human progress runs on an iterative loop: <strong className="text-ink font-medium">Observe → Reason → Execute</strong>.
            Traditional tools force you to spend 90% of your energy filing, tagging, and organizing before a thought is even formed.
          </p>
        </div>

        {/* Contrast Grid + Warm Callout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Card 1: Traditional PKMs */}
          <div className="rounded-xl border border-hairline bg-white p-7 text-left shadow-card-soft">
            <div className="flex items-center space-x-2 text-ink-stone mb-5">
              <span className="h-2 w-2 rounded-full bg-brand-error" />
              <span className="font-mono text-xs uppercase tracking-wider text-ink-stone font-medium">Traditional Tools</span>
            </div>
            <h3 className="font-sans text-base font-semibold text-ink mb-3">Filing Anxiety & Lost Context</h3>
            <ul className="space-y-3.5 text-xs text-ink-steel leading-relaxed">
              <li className="flex items-start space-x-2.5">
                <X className="h-4 w-4 text-brand-error mt-0.5 shrink-0" />
                <span>Forced folders, rigid taxonomies, and database setup tax.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <X className="h-4 w-4 text-brand-error mt-0.5 shrink-0" />
                <span>Voice notes pile up unlistened and unindexed.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <X className="h-4 w-4 text-brand-error mt-0.5 shrink-0" />
                <span>Notes become silent graveyards with zero proactive resurfacing.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: The Qel Paradigm (Featured Mint Border) */}
          <div className="rounded-xl border-2 border-mint bg-white p-7 text-left shadow-[0_8px_24px_rgba(0,212,164,0.12)] relative">
            <div className="flex items-center space-x-2 text-mint mb-5">
              <span className="h-2 w-2 rounded-full bg-mint shadow-mint-glow" />
              <span className="font-mono text-xs uppercase tracking-wider text-mint font-semibold">The Qel Paradigm</span>
            </div>
            <h3 className="font-sans text-base font-semibold text-ink mb-3">Remember Everything, Organize Nothing</h3>
            <ul className="space-y-3.5 text-xs text-ink-charcoal leading-relaxed">
              <li className="flex items-start space-x-2.5">
                <Check className="h-4 w-4 text-mint mt-0.5 shrink-0" />
                <span>Zero filing anxiety: drop raw thoughts, voice, and links instantly.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Check className="h-4 w-4 text-mint mt-0.5 shrink-0" />
                <span>Automatic separation of ground truth facts vs. open questions.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Check className="h-4 w-4 text-mint mt-0.5 shrink-0" />
                <span>Quiet, asynchronous connection of new notes to past questions.</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Warm Testimonial / Impact Callout (Mintlify Testimonial Orange) */}
          <div className="rounded-xl bg-testimonial-orange text-white p-7 text-left shadow-card-soft flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-white/80 font-semibold block mb-4">
                The 100x Mission
              </span>
              <p className="font-sans text-sm sm:text-base font-medium leading-relaxed">
                "Agency is the capacity of an individual to express their intent to effect change in the world and in themselves generatively."
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between text-xs text-white/90">
              <span className="font-mono text-[11px]">First Principles of Qel</span>
              <span className="font-sans font-semibold">Ogment Ecosystem</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
