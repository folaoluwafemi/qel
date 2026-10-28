"use client";

import React from "react";
import { ImageIcon, Palette } from "@qel/design-system";
import type { Artifact } from "@qel/core";

export function VisualPinCard({ artifact, onSelectColor }: { artifact: Artifact; onSelectColor?: (hex: string) => void }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-[#e5e5e5] bg-white transition-all duration-200 hover:border-[#00d4a4]/60 hover:shadow-hero-card">
      {/* Visual Image */}
      {artifact.r2MediaUrl && (
        <div className="relative overflow-hidden bg-[#f7f7f7]">
          <img
            src={artifact.r2MediaUrl}
            alt={artifact.title || "Visual Pin"}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      )}

      {/* 4-Color Dominant Palette Bar */}
      {artifact.dominantColors && artifact.dominantColors.length > 0 && (
        <div className="flex h-1.5 w-full">
          {artifact.dominantColors.map((color, idx) => (
            <button
              key={idx}
              onClick={() => onSelectColor?.(color)}
              className="h-full flex-1 transition-opacity hover:opacity-80"
              style={{ backgroundColor: color }}
              title={`Filter by color: ${color}`}
            />
          ))}
        </div>
      )}

      {/* Pin Description & Metadata */}
      <div className="p-4">
        {artifact.title && (
          <h3 className="font-sans text-sm font-semibold text-[#0a0a0a] line-clamp-1">
            {artifact.title}
          </h3>
        )}

        {artifact.rawText && (
          <p className="mt-1 text-xs text-[#5a5a5c] line-clamp-2">
            {artifact.rawText}
          </p>
        )}

        {/* OCR Extracted Text Pill */}
        {artifact.ocrExtractedText && (
          <div className="mt-2.5 rounded-lg bg-[#f7f7f7] border border-[#e5e5e5] px-2.5 py-1.5 text-[11px] text-[#5a5a5c]">
            <span className="font-mono text-[10px] font-semibold text-[#00d4a4]">OCR: </span>
            {artifact.ocrExtractedText.slice(0, 70)}...
          </div>
        )}

        {/* Aesthetic Tags */}
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
    </div>
  );
}
