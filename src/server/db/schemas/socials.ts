import { date, pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const Socials = pgTable(
  "socials",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    label: text("label"),
    platform: text("platform"),
    username: text("username"),
    link: text("link"),
    created_at: date("created_at").defaultNow(),
    updated_at: date("updated_at").defaultNow(),
  },
  (social) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(social.label),
    };
  },
);

export type Social = typeof Socials.$inferSelect;
export type Socials = (typeof Socials.$inferSelect)[];
