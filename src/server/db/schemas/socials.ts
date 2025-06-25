import { bigint, mysqlTable, text, timestamp } from "drizzle-orm/mysql-core";

export const socials = mysqlTable("socials", {
  id: bigint("id", {
    mode: "number",
  })
    .primaryKey()
    .autoincrement(),
  label: text("label"),
  platform: text("platform"),
  username: text("username"),
  link: text("link"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export type Social = typeof socials.$inferSelect;
export type Socials = (typeof socials.$inferSelect)[];
export type SocialInsert = typeof socials.$inferInsert;
