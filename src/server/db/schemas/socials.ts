import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const Socials = pgTable("socials", {
  id: uuid("id").primaryKey().defaultRandom(),
  label: text("label"),
  platform: text("platform"),
  username: text("username"),
  link: text("link"),
  created_at: date("created_at").defaultNow(),
  updated_at: date("updated_at").defaultNow(),
});

export type Social = typeof Socials.$inferSelect;
export type Socials = (typeof Socials.$inferSelect)[];
