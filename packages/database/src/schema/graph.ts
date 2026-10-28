import { pgTable, uuid, text, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { artifacts } from "./artifacts";

export const causalLinks = pgTable("causal_links", {
  id: uuid("id").primaryKey().defaultRandom(),
  sourceArtifactId: uuid("source_artifact_id").notNull().references(() => artifacts.id, { onDelete: "cascade" }),
  targetArtifactId: uuid("target_artifact_id").notNull().references(() => artifacts.id, { onDelete: "cascade" }),
  relationType: text("relation_type").notNull(), // 'causal_precursor' | 'reinforces' | 'contradicts' | 'cross_domain_analogy' | 'emergent_convergence'
  confidenceWeight: doublePrecision("confidence_weight").notNull().default(0.8),
  synthesizedReasoning: text("synthesized_reasoning"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type CausalLinkSelect = typeof causalLinks.$inferSelect;
export type CausalLinkInsert = typeof causalLinks.$inferInsert;
