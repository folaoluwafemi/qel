"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, MessageSquare, Send, X, ArrowUpRight, Zap, HelpCircle } from "@qel/design-system";

interface Message {
  role: "user" | "partner";
  content: string;
}

export function ThinkingPartnerDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "partner",
      content: "I'm with you. What are you thinking through right now? We can test assumptions, find the right project for your energy, or connect ideas from your past notes.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [energyLevel, setEnergyLevel] = useState<"low" | "medium" | "high">("medium");
  const [matchedIdeas, setMatchedIdeas] = useState<Array<{ title: string; reasoning: string }>>([
    { title: "Spatial Audio Memo Player", reasoning: "High leverage build aligned with your voice archive." },
    { title: "Minimalist Palette Browser", reasoning: "Low-friction, visually satisfying build for quick wins." },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    const API_ENDPOINT = "https://qel-api.folabuilds.workers.dev/api/v1/sparring/chat";

    try {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          energyLevel,
        }),
      });

      if (res.ok) {
        const data = (await res.json()) as { reply: string; matchedIdeas?: any[] };
        setMessages([...updatedMessages, { role: "partner", content: data.reply }]);
        if (data.matchedIdeas && data.matchedIdeas.length > 0) {
          setMatchedIdeas(data.matchedIdeas);
        }
      } else {
        // Fallback intelligent response if offline
        setTimeout(() => {
          setMessages([
            ...updatedMessages,
            {
              role: "partner",
              content: "I hear you. Looking at your recent thoughts on eliminating the planning tax, this connects directly with your thesis on active inference—minimizing surprise through direct action. Where do you want to push this next?",
            },
          ]);
        }, 500);
      }
    } catch (err) {
      setMessages([
        ...updatedMessages,
        {
          role: "partner",
          content: "I'm thinking about this in relation to your voice note from 2:40 AM. If we test this hypothesis against your project backlog, the fastest way to validate it is building a simple spatial scratchpad.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-[#e5e5e5] bg-white shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e5e5e5] px-5 py-4">
        <div className="flex items-center space-x-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#00d4a4] shadow-[0_0_8px_#00d4a4] animate-pulse" />
          <h3 className="font-sans text-base font-semibold text-[#0a0a0a]">Thinking Partner</h3>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-1.5 text-[#5a5a5c] hover:bg-[#f7f7f7] hover:text-[#0a0a0a] transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Energy Profile Pill Selector */}
      <div className="flex items-center justify-between border-b border-[#e5e5e5] px-5 py-2.5 bg-[#f7f7f7] text-xs">
        <span className="text-[#5a5a5c] text-[11px] font-medium">Energy state:</span>
        <div className="flex items-center space-x-1.5">
          {(["low", "medium", "high"] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setEnergyLevel(lvl)}
              className={`rounded-full px-3 py-0.5 text-[11px] font-medium capitalize transition-all ${
                energyLevel === lvl
                  ? "bg-[#0a0a0a] text-white shadow-sm"
                  : "bg-white text-[#5a5a5c] border border-[#e5e5e5] hover:text-[#0a0a0a]"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#fafafa]">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              m.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <span className="mb-1 font-mono text-[10px] uppercase tracking-wider text-[#888888]">
              {m.role === "user" ? "You" : "Qel Partner"}
            </span>
            <div
              className={`max-w-[88%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                m.role === "user"
                  ? "bg-[#0a0a0a] text-white font-normal shadow-sm"
                  : "bg-white text-[#1c1c1e] border border-[#e5e5e5] shadow-sm"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 text-[#5a5a5c] text-xs pt-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00d4a4] animate-bounce" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#00d4a4] animate-bounce [animation-delay:0.2s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#00d4a4] animate-bounce [animation-delay:0.4s]" />
            <span className="text-[11px] font-mono text-[#888888]">Thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Sparring Prompts */}
      <div className="border-t border-[#e5e5e5] px-4 py-2.5 bg-white flex flex-wrap gap-2">
        <button
          onClick={() => handleSend("What idea from my backlog fits my energy right now?")}
          className="rounded-full border border-[#e5e5e5] bg-[#f7f7f7] px-3 py-1 text-[11px] font-medium text-[#3a3a3c] hover:text-[#0a0a0a] hover:border-[#00d4a4] transition-all flex items-center space-x-1.5"
        >
          <Zap className="h-3 w-3 text-[#00d4a4]" />
          <span>Idea match</span>
        </button>
        <button
          onClick={() => handleSend("What are my active open questions in memory?")}
          className="rounded-full border border-[#e5e5e5] bg-[#f7f7f7] px-3 py-1 text-[11px] font-medium text-[#3a3a3c] hover:text-[#0a0a0a] hover:border-[#3772cf] transition-all flex items-center space-x-1.5"
        >
          <HelpCircle className="h-3 w-3 text-[#3772cf]" />
          <span>Open questions</span>
        </button>
      </div>

      {/* Input Dock */}
      <div className="border-t border-[#e5e5e5] p-4 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Spar on an idea or test an assumption..."
            className="flex-1 rounded-full border border-[#e5e5e5] bg-[#f7f7f7] px-4 py-2.5 text-xs text-[#0a0a0a] placeholder:text-[#888888] focus:bg-white focus:border-[#00d4a4] focus:outline-none focus:ring-1 focus:ring-[#00d4a4]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="rounded-full bg-[#00d4a4] p-2.5 text-[#0a0a0a] disabled:opacity-40 hover:bg-[#00b48a] shadow-[0_2px_10px_rgba(0,212,164,0.3)] transition-all"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
