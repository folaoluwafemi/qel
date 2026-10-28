"use client";

import React from "react";
import { FileText } from "@qel/design-system";
import type { Artifact } from "@qel/core";

export function NoteCard({ artifact }: { artifact: Artifact }) {
  return (
    <div className="group relative rounded-lg border border-hairline bg-surface-card p-5 transition-all duration-200 hover:border-hairline-strong hover:shadow-glow-subtle">
      <div className="flex items-center space-x-1.5 text-xs text-ink-mute">
        <FileText className="h-3.5 w-3.5 text-accent-green" />
        <span className="font-medium tracking-wide">NOTE</span>
      </div>

      {artifact.title && (
        <h3 className="mt-2.5 font-sans text-sm font-medium text-ink">
          {artifact.title}
        </h3>
      )}

      <p className="mt-2 font-sans text-xs leading-relaxed text-ink-body whitespace-pre-wrap">
        {artifact.rawText}
      </p>

      {artifact.autoTags && artifact.autoTags.length > 0 && (
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {artifact.autoTags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm bg-surface-elevated px-1.5 py-0.5 text-[10px] text-ink-mute"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
