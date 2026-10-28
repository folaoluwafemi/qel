"use client";

import React, { useState } from "react";
import { LinkIcon, FileText, ArrowUpRight, Eye } from "@qel/design-system";
import type { Artifact } from "@qel/core";

export function ArticleCard({ artifact }: { artifact: Artifact }) {
  const [readingMode, setReadingMode] = useState(false);

  return (
    <div className="group relative rounded-xl border border-[#e5e5e5] bg-white p-5 transition-all duration-200 hover:border-[#00d4a4]/60 hover:shadow-hero-card">
      {/* Domain & Source Header */}
      <div className="flex items-center justify-between text-xs text-[#5a5a5c]">
        <div className="flex items-center space-x-1.5 text-[#3772cf]">
          <LinkIcon className="h-3.5 w-3.5" />
          <span className="font-mono text-[11px] uppercase tracking-wider">
            {artifact.sourceUrl ? new URL(artifact.sourceUrl).hostname.replace("www.", "") : "WEB CLIPPING"}
          </span>
        </div>
        {artifact.sourceUrl && (
          <a
            href={artifact.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[#888888] transition-colors hover:text-[#0a0a0a]"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
      </div>

      {/* Article Title */}
      <h3 className="mt-3 font-sans text-base font-semibold leading-snug text-[#0a0a0a]">
        {artifact.title || "Web Article"}
      </h3>

      {/* Excerpt / User's personal reaction */}
      {artifact.rawText && (
        <p className="mt-2 text-xs text-[#5a5a5c] line-clamp-3">
          {artifact.rawText}
        </p>
      )}

      {/* Reading Mode Button */}
      {artifact.readingModeHtml && (
        <div className="mt-4 pt-3 border-t border-[#e5e5e5] flex items-center justify-between">
          <button
            onClick={() => setReadingMode(!readingMode)}
            className="flex items-center space-x-1.5 text-xs text-[#00d4a4] font-medium transition-colors hover:text-[#00b48a]"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Reading Mode</span>
          </button>
        </div>
      )}

      {/* Tags */}
      {artifact.autoTags && artifact.autoTags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {artifact.autoTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#f7f7f7] border border-[#e5e5e5] px-2.5 py-0.5 text-[10px] font-mono text-[#5a5a5c]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
