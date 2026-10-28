import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const ideaBacklog = pgTable("idea_backlog", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  rawPitch: text("raw_pitch").notNull(),
  aestheticPinIds: text("aesthetic_pin_ids").array(),
  energyProfile: text("energy_profile"), // 'deep_focus' | 'quick_vibe' | 'light_exploration'
  targetFrontierModel: text("target_frontier_model"),
  status: text("status").notNull().default("backlog"), // 'backlog' | 'active_sparring' | 'scaffolded' | 'archived'
  scaffoldedSpecMarkdown: text("scaffolded_spec_markdown"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type IdeaBacklogSelect = typeof ideaBacklog.$inferSelect;
export type IdeaBacklogInsert = typeof ideaBacklog.$inferInsert;
