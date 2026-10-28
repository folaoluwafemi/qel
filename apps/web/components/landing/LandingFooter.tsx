"use client";

import React from "react";
import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="bg-white border-t border-[#e5e5e5] py-14 text-xs text-[#5a5a5c]">
      <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand info */}
        <div className="flex items-center space-x-3">
          <span className="h-2 w-2 rounded-full bg-[#00d4a4] shadow-[0_0_8px_#00d4a4]" />
          <span className="font-sans text-sm font-semibold text-[#0a0a0a]">Qel</span>
          <span className="text-[#e5e5e5]">·</span>
          <span className="text-[#5a5a5c]">Personal Cognitive OS & Sovereign Thinking Partner</span>
        </div>

        {/* Ecosystem Links */}
        <div className="flex items-center space-x-6 text-[#5a5a5c] font-medium">
          <Link href="/app" className="hover:text-[#0a0a0a] transition-colors">
            Web App
          </Link>
          <a
            href="https://og-auth.folabuilds.workers.dev"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#0a0a0a] transition-colors"
          >
            OG Auth
          </a>
          <a
            href="https://qel-api.folabuilds.workers.dev/health"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#0a0a0a] transition-colors"
          >
            API Health
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#0a0a0a] transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 mt-8 pt-8 border-t border-[#ededed] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#888888]">
        <p>© {new Date().getFullYear()} Qel by Ogment Inc. All rights reserved.</p>
        <p className="font-mono">Mintlify Design System · Dual Atmospheric Aesthetics</p>
      </div>
    </footer>
  );
}
