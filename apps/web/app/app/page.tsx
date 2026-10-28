"use client";

import React, { useState, useEffect } from "react";
import type { Artifact } from "@qel/core";
import { HeaderNav } from "../../components/HeaderNav";
import { MasonryGrid } from "../../components/MasonryGrid";
import { QuickCaptureBar } from "../../components/QuickCaptureBar";
import { ThinkingPartnerDrawer } from "../../components/ThinkingPartnerDrawer";
import { OGAuthGate } from "../../components/OGAuthGate";
import { getAuthSession, signOut, type AuthUser } from "../../lib/auth";
import { Sparkles, Mic, FileText, LinkIcon, LogOut } from "@qel/design-system";

export default function SovereignStreamApp() {
  const [session, setSession] = useState<{ token: string | null; user: AuthUser | null }>({
    token: null,
    user: null,
  });
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Private User Artifacts - Starts completely empty (Zero Dummy Data)
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [activeSpace, setActiveSpace] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [colorFilter, setColorFilter] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Check OG Auth authentication status on mount
  useEffect(() => {
    const auth = getAuthSession();
    setSession(auth);
    setIsCheckingAuth(false);

    // Load user's private artifacts from localStorage if available
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("qel_user_artifacts");
      if (saved) {
        try {
          setArtifacts(JSON.parse(saved));
        } catch (e) {}
      }
    }
  }, []);

  // Save user's private artifacts when updated
  const saveArtifacts = (newArtifacts: Artifact[]) => {
    setArtifacts(newArtifacts);
    if (typeof window !== "undefined") {
      localStorage.setItem("qel_user_artifacts", JSON.stringify(newArtifacts));
    }
  };

  const handleCapture = (type: string, content: string) => {
    const newArtifact: Artifact = {
      id: `art_${Date.now()}`,
      userId: session.user?.id || "user_owner",
      createdAt: new Date().toISOString(),
      recordedAt: new Date().toISOString(),
      modality: type as any,
      title: type === "voice_memo" ? "Voice Note" : (type === "web_clipping" ? content : "Quick Thought"),
      rawText: content,
      dominantColors: ["#ffffff", "#00d4a4"],
      autoTags: ["personal-capture"],
    };

    saveArtifacts([newArtifact, ...artifacts]);
  };

  // Filter artifacts by active space tab, text search, or color filter
  const filteredArtifacts = artifacts.filter((artifact) => {
    if (activeSpace === "voice" && artifact.modality !== "voice_memo") return false;
    if (activeSpace === "visual" && artifact.modality !== "visual_pin" && artifact.modality !== "raw_image") return false;
    if (activeSpace === "articles" && artifact.modality !== "web_clipping") return false;
    if (activeSpace === "ideas" && !artifact.autoTags?.includes("idea-backlog")) return false;

    if (colorFilter && !artifact.dominantColors?.includes(colorFilter)) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = artifact.title?.toLowerCase().includes(q);
      const matchText = artifact.rawText?.toLowerCase().includes(q);
      const matchTags = artifact.autoTags?.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchText || matchTags;
    }

    return true;
  });

  // Loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex items-center space-x-2 text-ink text-sm">
          <span className="h-2 w-2 rounded-full bg-mint animate-pulse" />
          <span className="font-sans font-medium">Verifying OG Auth Session...</span>
        </div>
      </div>
    );
  }

  // OG Auth SSO Gate: Must be authenticated
  if (!session.token) {
    return <OGAuthGate />;
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-ink pb-32">
      {/* Top User Session Bar */}
      <div className="border-b border-hairline bg-white px-6 py-2 flex items-center justify-between text-xs text-ink-steel">
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-mint shadow-mint-glow" />
          <span className="font-sans">
            Signed in as <strong className="text-ink font-medium">{session.user?.email || "OG Member"}</strong>
          </span>
          <span className="rounded-full bg-mint/10 px-2 py-0.5 font-mono text-[10px] text-mint font-medium">
            OG Auth Verified
          </span>
        </div>

        <button
          onClick={() => signOut("/")}
          className="flex items-center space-x-1 text-ink-steel hover:text-brand-error transition-colors"
        >
          <LogOut className="h-3 w-3" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Header & Smart Spaces Navigation */}
      <HeaderNav
        activeSpace={activeSpace}
        onSelectSpace={(s) => {
          setActiveSpace(s);
          setColorFilter(null);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onTriggerSerendipity={() => {
          if (artifacts.length === 0) {
            alert("Your stream is clear. Capture thoughts first to trigger serendipity!");
            return;
          }
          const randomArtifact = artifacts[Math.floor(Math.random() * artifacts.length)];
          alert(`Serendipity Spark: "${randomArtifact.title || randomArtifact.rawText}"`);
        }}
      />

      {/* Active Filter Pill (if color selected) */}
      {colorFilter && (
        <div className="mx-auto max-w-7xl px-6 pt-4 flex items-center space-x-2">
          <span className="text-xs text-ink-steel">Filtered by color:</span>
          <div className="flex items-center space-x-1.5 rounded-full bg-white px-2.5 py-1 text-xs border border-hairline shadow-sm">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colorFilter }} />
            <span className="font-mono text-xs text-ink">{colorFilter}</span>
            <button
              onClick={() => setColorFilter(null)}
              className="ml-1 text-ink-steel hover:text-ink text-xs"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-6 pt-8">
        {artifacts.length === 0 ? (
          /* Zero Dummy Data - Clean Private Empty State */
          <div className="my-20 mx-auto max-w-md text-center">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-white border border-hairline flex items-center justify-center text-mint shadow-card-soft mb-4">
              <Sparkles className="h-6 w-6" />
            </div>

            <h3 className="font-sans text-lg font-semibold text-ink">
              Your sovereign stream is clear
            </h3>

            <p className="mt-2 text-xs text-ink-steel leading-relaxed">
              Zero clutter, zero pre-populated notes. Drop your first voice memo, web clipping, or reflection using the quick dock below.
            </p>

            <div className="mt-6 flex items-center justify-center space-x-4 text-xs text-ink-steel">
              <span className="flex items-center space-x-1">
                <Mic className="h-3.5 w-3.5 text-mint" />
                <span>Voice Notes</span>
              </span>
              <span className="flex items-center space-x-1">
                <LinkIcon className="h-3.5 w-3.5 text-brand-tag" />
                <span>Web Clips</span>
              </span>
              <span className="flex items-center space-x-1">
                <FileText className="h-3.5 w-3.5 text-ink-steel" />
                <span>Raw Thoughts</span>
              </span>
            </div>
          </div>
        ) : (
          /* Live User Artifacts */
          <MasonryGrid
            artifacts={filteredArtifacts}
            onSelectColor={(hex) => setColorFilter(hex)}
          />
        )}
      </main>

      {/* Floating Quick Capture Bar */}
      <QuickCaptureBar onCapture={handleCapture} />

      {/* Floating Thinking Partner Trigger */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="fixed bottom-8 right-8 z-40 flex items-center space-x-2 rounded-full border border-hairline bg-white px-4 py-2.5 shadow-hero-card hover:border-mint text-ink transition-all group"
      >
        <span className="h-2 w-2 rounded-full bg-mint shadow-mint-glow animate-pulse" />
        <span className="font-sans text-xs font-medium">Thinking Partner</span>
        <Sparkles className="h-3.5 w-3.5 text-mint group-hover:rotate-12 transition-transform" />
      </button>

      {/* Thinking Partner Drawer */}
      <ThinkingPartnerDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
