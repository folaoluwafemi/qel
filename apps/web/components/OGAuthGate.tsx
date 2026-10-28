"use client";

import React from "react";
import Link from "next/link";
import { redirectToOgAuth } from "../lib/auth";
import { ArrowRight, Sparkles, ArrowLeft } from "@qel/design-system";

export function OGAuthGate() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#87a8c8]/20 via-[#f5e9d8]/20 to-white">
      <div className="w-full max-w-md rounded-2xl border border-hairline bg-white p-8 sm:p-10 shadow-hero-card text-center relative overflow-hidden">
        {/* Top Brand Orb */}
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg border border-hairline-dark">
          <span className="font-mono text-base font-bold tracking-tight text-mint">
            OG
          </span>
        </div>

        <span className="inline-flex items-center space-x-1.5 rounded-full bg-mint/10 px-3 py-1 font-mono text-[11px] font-medium text-mint mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-mint-glow" />
          <span>Central Authentication Gate</span>
        </span>

        <h2 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
          Sign in to your Sovereign Space
        </h2>

        <p className="mt-2.5 text-xs sm:text-sm text-ink-steel leading-relaxed">
          Qel is private by design. Sign in with your universal <strong className="text-ink font-medium">OG Auth</strong> account to access your longitudinal memory, voice drops, and infinite canvas.
        </p>

        <div className="mt-8 space-y-3">
          <button
            onClick={() => redirectToOgAuth("/app")}
            className="w-full flex items-center justify-center space-x-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-white hover:bg-ink-charcoal shadow-hero-card active:scale-98 transition-all"
          >
            <span>Continue with OG Auth</span>
            <ArrowRight className="h-4 w-4 text-mint" />
          </button>

          <a
            href="https://og-auth.folabuilds.workers.dev/login?mode=signup&redirectTo=https://qel-web-production.up.railway.app/app"
            className="w-full flex items-center justify-center space-x-2 rounded-full border border-hairline bg-surface px-6 py-3 text-sm font-medium text-ink hover:bg-surface-soft transition-all"
          >
            <span>Create New OG Account</span>
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-hairline flex items-center justify-between text-xs text-ink-stone">
          <Link href="/" className="flex items-center space-x-1 hover:text-ink transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Homepage</span>
          </Link>
          <span className="font-mono text-[10px]">OG Auth SSO · Ogment</span>
        </div>
      </div>
    </div>
  );
}
