"use client";

import React from "react";
import { Sparkles, Search, Layers, Compass } from "@qel/design-system";

export function HeaderNav({
  activeSpace,
  onSelectSpace,
  searchQuery,
  onSearchChange,
  onTriggerSerendipity,
}: {
  activeSpace: string;
  onSelectSpace: (space: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onTriggerSerendipity?: () => void;
}) {
  const spaces = [
    { id: "all", label: "All Artifacts" },
    { id: "voice", label: "Voice Journals" },
    { id: "visual", label: "Visual Inspo" },
    { id: "articles", label: "Readings" },
    { id: "ideas", label: "Idea Backlog" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-[#e5e5e5] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        {/* Brand & Wordmark */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-[#00d4a4] shadow-[0_0_8px_#00d4a4]" />
            <h1 className="font-sans text-lg font-semibold tracking-tight text-[#0a0a0a]">Qel</h1>
          </div>

          {/* Smart Spaces Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1.5">
            {spaces.map((space) => (
              <button
                key={space.id}
                onClick={() => onSelectSpace(space.id)}
                className={`rounded-full px-3.5 py-1 text-xs font-medium transition-colors ${
                  activeSpace === space.id
                    ? "bg-[#0a0a0a] text-white shadow-sm"
                    : "text-[#5a5a5c] hover:text-[#0a0a0a] hover:bg-[#f7f7f7]"
                }`}
              >
                {space.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Search Bar & Serendipity Trigger */}
        <div className="flex items-center space-x-3">
          <div className="relative w-48 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#888888]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by text, color, tag..."
              className="w-full rounded-full border border-[#e5e5e5] bg-[#f7f7f7] pl-8 pr-3 py-1.5 text-xs text-[#0a0a0a] placeholder:text-[#888888] focus:bg-white focus:border-[#00d4a4] focus:outline-none focus:ring-1 focus:ring-[#00d4a4]"
            />
          </div>

          {/* Serendipity Button */}
          <button
            onClick={onTriggerSerendipity}
            className="flex items-center space-x-1.5 rounded-full border border-[#e5e5e5] bg-white px-3.5 py-1.5 text-xs font-medium text-[#0a0a0a] transition-all hover:border-[#00d4a4] hover:bg-[#f7f7f7]"
            title="Resurface forgotten ideas"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#00d4a4]" />
            <span className="hidden sm:inline">Serendipity</span>
          </button>
        </div>
      </div>
    </header>
  );
}
