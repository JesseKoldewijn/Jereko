import {
  date,
  pgTable,
  text,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

type UrlType = "video" | "image" | "link";

export const Events = pgTable(
  "events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name"),
    location: text("location"),
    description: varchar("description"),
    url: text("url"),
    url_type: text("url_type").$type<UrlType>(),
    skills: text("skills"),
    day: text("day"),
    month: text("month"),
    year: text("year"),
    created_at: date("created_at").defaultNow(),
    updated_at: date("updated_at").defaultNow(),
  },
  (x) => {
    return {
      eventIdx: uniqueIndex("event_idx").on(x.name),
    };
  },
);

export type Event = typeof Events.$inferSelect;
export type Events = (typeof Events.$inferSelect)[];
