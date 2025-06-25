import {
  bigint,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

type UrlType = "video" | "image" | "link";

export const events = mysqlTable(
  "events",
  {
    id: bigint("id", {
      mode: "number",
    })
      .primaryKey()
      .autoincrement(),
    name: text("name"),
    location: text("location"),
    description: text("description"),
    url: text("url"),
    url_type: text("url_type").$type<UrlType>(),
    skills: text("skills"),
    day: text("day"),
    month: text("month"),
    year: text("year"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  },
  (x) => {
    return {
      eventIdx: uniqueIndex("event_idx").on(x.name),
    };
  },
);

export type Event = typeof events.$inferSelect;
export type Events = (typeof events.$inferSelect)[];

export type EventInsert = typeof events.$inferInsert;
