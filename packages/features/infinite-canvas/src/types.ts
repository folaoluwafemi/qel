export type CanvasNodeType =
  | "artifact_card"
  | "sticky_note"
  | "web_bookmark"
  | "visual_pin"
  | "freehand_text";

export interface CanvasNode {
  id: string;
  type: CanvasNodeType;
  x: number;
  y: number;
  width: number;
  height: number;
  title?: string;
  content?: string;
  mediaUrl?: string;
  sourceUrl?: string;
  colorHex?: string;
  artifactId?: string;
  zIndex: number;
}

export interface CanvasConnector {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  label?: string;
  colorHex?: string;
  isDashed?: boolean;
}

export interface CanvasStrokePoint {
  x: number;
  y: number;
  pressure?: number;
}

export interface CanvasFreehandStroke {
  id: string;
  colorHex: string;
  strokeWidth: number;
  points: CanvasStrokePoint[];
}

export interface CanvasViewport {
  x: number;
  y: number;
  zoom: number;
}

export interface CanvasSceneGraph {
  id: string;
  spaceId: string;
  viewport: CanvasViewport;
  nodes: CanvasNode[];
  connectors: CanvasConnector[];
  strokes: CanvasFreehandStroke[];
  updatedAt: string;
}
