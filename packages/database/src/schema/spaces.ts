import { pgTable, uuid, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const smartSpaces = pgTable("smart_spaces", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  icon: text("icon"),
  livingQuery: jsonb("living_query").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type SmartSpaceSelect = typeof smartSpaces.$inferSelect;
export type SmartSpaceInsert = typeof smartSpaces.$inferInsert;
