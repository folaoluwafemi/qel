"use client";

import React from "react";
import type { Artifact } from "@qel/core";
import { VoiceCard } from "./VoiceCard";
import { VisualPinCard } from "./VisualPinCard";
import { ArticleCard } from "./ArticleCard";
import { NoteCard } from "./NoteCard";

export function MasonryGrid({
  artifacts,
  onSelectColor,
}: {
  artifacts: Artifact[];
  onSelectColor?: (colorHex: string) => void;
}) {
  if (artifacts.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-center">
        <p className="font-serif text-xl text-ink-mute">Your mind is calm and clear.</p>
        <p className="mt-1 text-xs text-ink-ash">Record a voice memo, paste a link, or drop an image below.</p>
      </div>
    );
  }

  return (
    <div className="columns-1 gap-5 sm:columns-2 md:columns-3 lg:columns-4 [column-fill:_balance]">
      {artifacts.map((artifact) => (
        <div key={artifact.id} className="mb-5 break-inside-avoid">
          {(() => {
            switch (artifact.modality) {
              case "voice_memo":
                return <VoiceCard artifact={artifact} />;
              case "visual_pin":
              case "raw_image":
                return <VisualPinCard artifact={artifact} onSelectColor={onSelectColor} />;
              case "web_clipping":
                return <ArticleCard artifact={artifact} />;
              case "raw_note":
              default:
                return <NoteCard artifact={artifact} />;
            }
          })()}
        </div>
      ))}
    </div>
  );
}
