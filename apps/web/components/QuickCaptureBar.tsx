"use client";

import React, { useState } from "react";
import { Mic, MicOff, Plus, LinkIcon, ImageIcon, ArrowUpRight } from "@qel/design-system";

export function QuickCaptureBar({ onCapture }: { onCapture?: (type: string, content: string) => void }) {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const isUrl = /^https?:\/\//i.test(input.trim());
    onCapture?.(isUrl ? "web_clipping" : "raw_note", input.trim());
    setInput("");
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4">
      <div className="relative flex items-center rounded-full border border-[#e5e5e5] bg-white/95 p-2 shadow-hero-card backdrop-blur-xl transition-all focus-within:border-[#00d4a4] focus-within:ring-2 focus-within:ring-[#00d4a4]/20">
        {/* Voice Record Toggle */}
        <button
          type="button"
          onClick={() => {
            setIsRecording(!isRecording);
            if (!isRecording) {
              // Simulating voice capture trigger
              onCapture?.("voice_memo", "Voice note recorded at " + new Date().toLocaleTimeString());
            }
          }}
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
            isRecording
              ? "bg-[#00d4a4] text-[#0a0a0a] animate-pulse shadow-[0_0_12px_rgba(0,212,164,0.4)]"
              : "text-[#5a5a5c] hover:bg-[#f7f7f7] hover:text-[#0a0a0a]"
          }`}
          title={isRecording ? "Stop Recording" : "Record Voice Memo"}
        >
          {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>

        {/* Text Input / Quick Link Paste */}
        <form onSubmit={handleSubmit} className="flex flex-1 items-center px-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isRecording ? "Recording voice memo..." : "Remember a thought, paste a link, drop an idea..."}
            className="w-full bg-transparent text-sm text-[#0a0a0a] placeholder:text-[#888888] focus:outline-none"
          />

          {input.trim() && (
            <button
              type="submit"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0a0a0a] text-white transition-transform active:scale-95 hover:bg-[#1c1c1e]"
            >
              <ArrowUpRight className="h-4 w-4" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
