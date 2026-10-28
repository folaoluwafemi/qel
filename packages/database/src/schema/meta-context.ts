import { pgTable, uuid, text, timestamp, jsonb, doublePrecision } from "drizzle-orm/pg-core";
import { artifacts } from "./artifacts";

export const metaContextEnvelopes = pgTable("meta_context_envelopes", {
  id: uuid("id").primaryKey().defaultRandom(),
  artifactId: uuid("artifact_id").notNull().references(() => artifacts.id, { onDelete: "cascade" }),
  groundTruthFacts: jsonb("ground_truth_facts").notNull().default({}),
  highConfidenceSignals: jsonb("high_confidence_signals").notNull().default({}),
  probabilisticInferences: jsonb("probabilistic_inferences").notNull().default({}),
  epistemicVoids: text("epistemic_voids").array().notNull().default([]),
  overallPrecisionScore: doublePrecision("overall_precision_score").notNull().default(1.0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const epistemicVoidIndex = pgTable("epistemic_void_index", {
  id: uuid("id").primaryKey().defaultRandom(),
  sourceArtifactId: uuid("source_artifact_id").notNull().references(() => artifacts.id, { onDelete: "cascade" }),
  voidDescription: text("void_description").notNull(),
  requiredModality: text("required_modality"),
  status: text("status").notNull().default("open"), // 'open' | 'resolved' | 'expired'
  resolvedByArtifactId: uuid("resolved_by_artifact_id").references(() => artifacts.id),
  resolutionNotes: text("resolution_notes"),
  resolvedAt: timestamp("resolved_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type MetaContextEnvelopeSelect = typeof metaContextEnvelopes.$inferSelect;
export type EpistemicVoidSelect = typeof epistemicVoidIndex.$inferSelect;
