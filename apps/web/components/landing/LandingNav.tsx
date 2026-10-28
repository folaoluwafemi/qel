"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Search, Sparkles } from "@qel/design-system";

export function LandingNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        {/* Brand */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-white font-mono text-xs font-bold shadow-sm">
              <span className="text-mint">Q</span>
            </span>
            <span className="font-sans text-base font-semibold tracking-tight text-ink">
              Qel
            </span>
          </Link>

          {/* Mintlify Search Pill */}
          <div className="hidden lg:flex items-center space-x-2 rounded-full border border-hairline bg-surface px-3.5 py-1.5 text-xs text-ink-steel w-60">
            <Search className="h-3.5 w-3.5 text-ink-stone" />
            <span className="flex-1 text-[13px]">Search thoughts...</span>
            <kbd className="rounded bg-white px-1.5 py-0.5 font-mono text-[10px] text-ink-stone border border-hairline shadow-xs">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Navigation Links - Inter 14px */}
        <nav className="hidden md:flex items-center space-x-8 text-[14px] text-ink-steel font-normal">
          <a href="#philosophy" className="hover:text-ink transition-colors">
            Philosophy
          </a>
          <a href="#omni-capture" className="hover:text-ink transition-colors">
            Omni-Capture
          </a>
          <a href="#canvas" className="hover:text-ink transition-colors">
            Infinite Canvas
          </a>
          <a href="#thinking-partner" className="hover:text-ink transition-colors">
            Thinking Partner
          </a>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center space-x-3">
          <a
            href="https://og-auth.folabuilds.workers.dev/login"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-block text-[14px] text-ink-steel hover:text-ink font-medium px-3 py-1.5 transition-colors"
          >
            Sign In
          </a>

          {/* Mintlify Black Pill CTA */}
          <Link
            href="/app"
            className="flex items-center space-x-1.5 rounded-full bg-primary px-5 py-2 text-[14px] font-medium text-white hover:bg-ink-charcoal active:scale-98 transition-all shadow-sm"
          >
            <span>Launch App</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-mint" />
          </Link>
        </div>
      </div>
    </header>
  );
}
