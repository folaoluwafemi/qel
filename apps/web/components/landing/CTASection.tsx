"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "@qel/design-system";

export function CTASection() {
  return (
    <section className="py-24 border-b border-[#e5e5e5] bg-white relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-3xl border border-[#2d5a4f] bg-gradient-to-b from-[#1a3d4a] to-[#244b42] p-10 sm:p-16 text-center relative overflow-hidden shadow-2xl">
          {/* Subtle inner radiance */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-[#00d4a4]/20 blur-[100px]" />

          {/* Badge */}
          <span className="inline-flex items-center space-x-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs text-white/90 backdrop-blur-md mb-6">
            <span className="h-2 w-2 rounded-full bg-[#00d4a4] shadow-[0_0_8px_#00d4a4]" />
            <span className="font-medium">Ready for Sovereign Thinking</span>
          </span>

          <h2 className="mx-auto max-w-2xl font-sans text-3xl sm:text-5xl font-semibold tracking-[-1px] sm:tracking-[-1.5px] text-white">
            Start closing the gap between latent thought and reality.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
            Eliminate the planning tax forever. Ingest your voice archive, explore your aesthetic taste, and spar with an AI partner that actually knows your creative history.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/app"
              className="flex w-full sm:w-auto items-center justify-center space-x-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#0a0a0a] hover:bg-[#f5f5f5] shadow-lg transition-all active:scale-[0.98]"
            >
              <span>Launch Qel App</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="https://og-auth.folabuilds.workers.dev/login"
              target="_blank"
              rel="noreferrer"
              className="flex w-full sm:w-auto items-center justify-center space-x-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-medium text-white hover:bg-white/20 backdrop-blur transition-all"
            >
              <span>Sign In with OG Auth</span>
            </a>
          </div>

          <p className="mt-8 font-mono text-[11px] text-white/60">
            Instant setup · Zero credit card required · Open Sovereign OS
          </p>
        </div>
      </div>
    </section>
  );
}
