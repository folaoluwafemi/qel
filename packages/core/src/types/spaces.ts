export interface LivingQueryRule {
  tags?: string[];
  colors?: string[];
  modalities?: string[];
  textQuery?: string;
  dateRange?: {
    from?: string;
    to?: string;
  };
}

export interface SmartSpace {
  id: string;
  userId: string;
  name: string;
  icon?: string;
  livingQuery: LivingQueryRule;
  createdAt: string;
}

export interface CanvasSceneElement {
  id: string;
  type: "card" | "sticky" | "arrow" | "drawing" | "image" | "audio_player";
  x: number;
  y: number;
  width?: number;
  height?: number;
  data: Record<string, any>;
}

export interface CanvasScene {
  id: string;
  spaceId: string;
  viewport: { x: number; y: number; zoom: number };
  elements: CanvasSceneElement[];
  updatedAt: string;
}
