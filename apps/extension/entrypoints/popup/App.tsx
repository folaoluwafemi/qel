import React, { useState, useEffect } from "react";
import { LinkIcon, Check, ArrowRight, Tag, Sparkles } from "@qel/design-system";

export function App() {
  const [tabInfo, setTabInfo] = useState<{ title: string; url: string; favIconUrl?: string }>({
    title: "",
    url: "",
  });
  const [notes, setNotes] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(["web-bookmark"]);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.tabs?.query) {
      chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        if (tab) {
          setTabInfo({
            title: tab.title || "",
            url: tab.url || "",
            favIconUrl: tab.favIconUrl,
          });
        }
      });
    }
  }, []);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleSave = async (destination: "stream" | "canvas") => {
    setIsSaving(true);
    const API_ENDPOINT = "https://qel-api.folabuilds.workers.dev/api/v1/artifacts";

    const payload = {
      userId: "user_owner",
      recordedAt: new Date().toISOString(),
      modality: "web_clipping",
      title: tabInfo.title,
      sourceUrl: tabInfo.url,
      rawText: notes,
      autoTags: tags,
      destination,
    };

    try {
      await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setIsSaved(true);
      setTimeout(() => {
        if (typeof window !== "undefined") window.close();
      }, 1200);
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-4 bg-canvas text-ink border border-hairline rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-hairline">
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-accent-orange shadow-glow-orange" />
          <span className="font-serif text-sm tracking-wide text-ink">Qel Omni-Capture</span>
        </div>
        <span className="font-mono text-[10px] text-ink-mute">Cmd+Shift+S</span>
      </div>

      {/* Active Tab Preview */}
      <div className="mt-3 rounded-lg bg-surface-card border border-hairline p-3">
        <div className="flex items-center space-x-2">
          {tabInfo.favIconUrl ? (
            <img src={tabInfo.favIconUrl} alt="" className="h-4 w-4 rounded" />
          ) : (
            <LinkIcon className="h-4 w-4 text-accent-blue" />
          )}
          <span className="font-sans text-xs font-medium text-ink line-clamp-1">
            {tabInfo.title || "Loading tab..."}
          </span>
        </div>
        <p className="mt-1 font-mono text-[10px] text-ink-mute truncate">
          {tabInfo.url}
        </p>
      </div>

      {/* Note / Thought Input */}
      <div className="mt-3">
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add a thought or why you saved this..."
          className="w-full rounded-lg border border-hairline bg-surface-card p-2.5 text-xs text-ink placeholder:text-ink-stone focus:border-accent-orange/60 focus:outline-none resize-none"
        />
      </div>

      {/* Tags */}
      <div className="mt-2">
        <div className="flex flex-wrap gap-1 mb-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center space-x-1 rounded bg-surface-elevated px-2 py-0.5 text-[10px] text-ink-mute"
            >
              <span>#{tag}</span>
              <button
                onClick={() => setTags(tags.filter((t) => t !== tag))}
                className="hover:text-ink"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
          placeholder="Add tags (press Enter)..."
          className="w-full rounded-md border border-hairline bg-surface-card px-2.5 py-1 text-[11px] text-ink placeholder:text-ink-stone focus:border-accent-orange/60 focus:outline-none"
        />
      </div>

      {/* Actions */}
      <div className="mt-4 pt-3 border-t border-hairline flex items-center space-x-2">
        <button
          onClick={() => handleSave("stream")}
          disabled={isSaving || isSaved}
          className={`flex flex-1 items-center justify-center space-x-1.5 rounded-lg py-2 text-xs font-medium transition-all ${
            isSaved
              ? "bg-accent-green text-black"
              : "bg-accent-orange text-black hover:bg-accent-coral active:scale-98"
          }`}
        >
          {isSaved ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Saved to Qel!</span>
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5" />
              <span>{isSaving ? "Saving..." : "Save to Stream"}</span>
            </>
          )}
        </button>

        <button
          onClick={() => handleSave("canvas")}
          disabled={isSaving || isSaved}
          className="rounded-lg border border-hairline bg-surface-elevated px-3 py-2 text-xs text-ink-mute hover:text-ink hover:border-hairline-strong transition-colors"
          title="Drop as spatial card on active Canvas"
        >
          To Canvas
        </button>
      </div>
    </div>
  );
}
