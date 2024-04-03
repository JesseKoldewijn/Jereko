import {
  boolean,
  date,
  pgTable,
  text,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const Projects = pgTable(
  "projects",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("name"),
    sub_title: text("sub_title"),
    description: varchar("description"),
    link: text("link"),
    tags: text("tags"),
    draft: boolean("draft").default(true),
    created_at: date("created_at").defaultNow(),
    updated_at: date("updated_at").defaultNow(),
  },
  (x) => {
    return {
      projIdx: uniqueIndex("proj_idx").on(x.title),
    };
  },
);

export type Project = typeof Projects.$inferSelect;
export type Projects = (typeof Projects.$inferSelect)[];
