export type IdeaEnergyProfile = "deep_focus" | "quick_vibe" | "light_exploration";
export type IdeaStatus = "backlog" | "active_sparring" | "scaffolded" | "archived";

export interface IdeaBacklogItem {
  id: string;
  userId: string;
  title: string;
  rawPitch: string;
  aestheticPinIds?: string[];
  energyProfile?: IdeaEnergyProfile;
  targetFrontierModel?: string;
  status: IdeaStatus;
  scaffoldedSpecMarkdown?: string;
  createdAt: string;
}
