"use client";

import React, { useState, useRef, useEffect } from "react";
import type { CanvasNode, CanvasConnector, CanvasViewport, CanvasSceneGraph } from "../types";
import { Plus, Move, LinkIcon, FileText, ImageIcon, ArrowUpRight, Maximize2, Sparkles } from "@qel/design-system";

export function CanvasRenderer({
  initialScene,
  onSceneChange,
}: {
  initialScene?: Partial<CanvasSceneGraph>;
  onSceneChange?: (scene: CanvasSceneGraph) => void;
}) {
  const [viewport, setViewport] = useState<CanvasViewport>(
    initialScene?.viewport || { x: 0, y: 0, zoom: 1 }
  );

  const [nodes, setNodes] = useState<CanvasNode[]>(initialScene?.nodes || []);
  const [connectors, setConnectors] = useState<CanvasConnector[]>(initialScene?.connectors || []);

  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<"select" | "sticky" | "link">("select");

  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    const newZoom = Math.min(Math.max(viewport.zoom * zoomFactor, 0.25), 3.0);
    setViewport((prev) => ({ ...prev, zoom: newZoom }));
  };

  // Pan canvas
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 && (e.target === containerRef.current || (e.target as HTMLElement).id === "canvas-plane")) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - viewport.x, y: e.clientY - viewport.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setViewport((prev) => ({
        ...prev,
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      }));
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Dragging a node
  const handleDragNode = (nodeId: string, deltaX: number, deltaY: number) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === nodeId
          ? { ...n, x: n.x + deltaX / viewport.zoom, y: n.y + deltaY / viewport.zoom }
          : n
      )
    );
  };

  const addNode = (type: "sticky_note" | "web_bookmark") => {
    const newNode: CanvasNode = {
      id: `node-${Date.now()}`,
      type,
      x: -viewport.x / viewport.zoom + 200,
      y: -viewport.y / viewport.zoom + 150,
      width: 260,
      height: 160,
      title: type === "sticky_note" ? "New Thought" : "New Link",
      content: "Type your reflection or paste URL here...",
      colorHex: type === "sticky_note" ? "#00d4a4" : undefined,
      zIndex: nodes.length + 1,
    };
    setNodes((prev) => [...prev, newNode]);
    setSelectedNodeId(newNode.id);
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="relative h-screen w-full select-none overflow-hidden bg-surface-soft cursor-grab active:cursor-grabbing"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(10, 10, 10, 0.08) 1px, transparent 0)`,
        backgroundSize: `${32 * viewport.zoom}px ${32 * viewport.zoom}px`,
        backgroundPosition: `${viewport.x}px ${viewport.y}px`,
      }}
    >
      {/* Canvas Top Floating Toolbar - Mintlify Black Pill Aesthetic */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-1.5 rounded-full border border-hairline bg-white/95 px-3 py-1.5 shadow-hero-card backdrop-blur-xl">
        <button
          onClick={() => setActiveTool("select")}
          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs transition-colors ${
            activeTool === "select" ? "bg-primary text-white" : "text-ink-steel hover:bg-surface hover:text-ink"
          }`}
          title="Select / Move Tool"
        >
          <Move className="h-4 w-4" />
        </button>
        <button
          onClick={() => addNode("sticky_note")}
          className="flex h-8 items-center space-x-1.5 rounded-full px-3 text-xs text-ink-steel hover:bg-surface hover:text-ink transition-colors font-medium"
          title="Add Thought Note"
        >
          <FileText className="h-3.5 w-3.5 text-mint" />
          <span>Thought</span>
        </button>
        <button
          onClick={() => addNode("web_bookmark")}
          className="flex h-8 items-center space-x-1.5 rounded-full px-3 text-xs text-ink-steel hover:bg-surface hover:text-ink transition-colors font-medium"
          title="Add Web Link"
        >
          <LinkIcon className="h-3.5 w-3.5 text-brand-tag" />
          <span>Link</span>
        </button>
        <div className="h-4 w-[1px] bg-hairline" />
        <button
          onClick={() => setViewport({ x: 0, y: 0, zoom: 1 })}
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-steel hover:bg-surface hover:text-ink transition-colors"
          title="Reset Viewport"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
        <span className="font-mono text-[11px] text-ink-steel px-1">
          {Math.round(viewport.zoom * 100)}%
        </span>
      </div>

      {/* Zero Dummy Data - Clean Empty State */}
      {nodes.length === 0 && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
          <div className="rounded-2xl border border-hairline bg-white/95 p-8 shadow-hero-card backdrop-blur-md max-w-sm pointer-events-auto">
            <div className="mx-auto h-10 w-10 rounded-full bg-mint/10 border border-mint/30 flex items-center justify-center text-mint mb-3">
              <Move className="h-5 w-5" />
            </div>
            <h4 className="font-sans text-sm font-semibold text-ink">Your canvas is clean</h4>
            <p className="mt-1.5 text-xs text-ink-steel leading-relaxed">
              Zero clutter, zero pre-populated cards. Click <span className="font-mono text-mint font-medium">+ Thought</span> or <span className="font-mono text-brand-tag font-medium">+ Link</span> above to arrange your thoughts spatially.
            </p>
          </div>
        </div>
      )}

      {/* Spatial Plane (Scaled & Translated) */}
      <div
        id="canvas-plane"
        className="absolute origin-top-left inset-0 pointer-events-auto"
        style={{
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        }}
      >
        {/* SVG Connectors Layer */}
        <svg className="absolute inset-0 pointer-events-none overflow-visible w-full h-full">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#00d4a4" />
            </marker>
          </defs>
          {connectors.map((connector) => {
            const source = nodes.find((n) => n.id === connector.sourceNodeId);
            const target = nodes.find((n) => n.id === connector.targetNodeId);
            if (!source || !target) return null;

            const startX = source.x + source.width;
            const startY = source.y + source.height / 2;
            const endX = target.x;
            const endY = target.y + target.height / 2;
            const midX = (startX + endX) / 2;

            return (
              <g key={connector.id}>
                <path
                  d={`M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`}
                  fill="none"
                  stroke={connector.colorHex || "#00d4a4"}
                  strokeWidth="2"
                  strokeDasharray={connector.isDashed ? "4 4" : undefined}
                  markerEnd="url(#arrowhead)"
                />
                {connector.label && (
                  <text
                    x={midX}
                    y={(startY + endY) / 2 - 8}
                    fill="#5a5a5c"
                    fontSize="11"
                    fontFamily="Geist Mono"
                    textAnchor="middle"
                  >
                    {connector.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Spatial Nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            onMouseDown={(e) => {
              e.stopPropagation();
              setSelectedNodeId(node.id);
              let startX = e.clientX;
              let startY = e.clientY;

              const onMove = (moveEvt: MouseEvent) => {
                const deltaX = moveEvt.clientX - startX;
                const deltaY = moveEvt.clientY - startY;
                startX = moveEvt.clientX;
                startY = moveEvt.clientY;
                handleDragNode(node.id, deltaX, deltaY);
              };

              const onUp = () => {
                window.removeEventListener("mousemove", onMove);
                window.removeEventListener("mouseup", onUp);
              };

              window.addEventListener("mousemove", onMove);
              window.addEventListener("mouseup", onUp);
            }}
            style={{
              transform: `translate(${node.x}px, ${node.y}px)`,
              width: `${node.width}px`,
              zIndex: node.zIndex,
            }}
            className={`absolute rounded-xl border bg-white p-4 shadow-card-soft cursor-grab active:cursor-grabbing transition-shadow ${
              selectedNodeId === node.id
                ? "border-mint ring-2 ring-mint/20 shadow-mint-glow"
                : "border-hairline hover:border-hairline-strong"
            }`}
          >
            {/* Visual Header */}
            <div className="flex items-center justify-between text-xs text-ink-steel mb-2">
              <span className="font-mono uppercase tracking-wider text-[10px] text-mint font-medium">
                {node.type.replace("_", " ")}
              </span>
              {node.sourceUrl && (
                <a
                  href={node.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink-steel hover:text-ink"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>

            {/* Media thumbnail if image */}
            {node.mediaUrl && (
              <img
                src={node.mediaUrl}
                alt={node.title || "Canvas Media"}
                className="mb-2 h-28 w-full rounded-md object-cover"
              />
            )}

            {/* Title */}
            {node.title && (
              <h4 className="font-sans text-sm font-medium text-ink leading-tight">
                {node.title}
              </h4>
            )}

            {/* Content */}
            {node.content && (
              <p className="mt-1.5 text-xs text-ink-charcoal leading-relaxed line-clamp-4">
                {node.content}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
