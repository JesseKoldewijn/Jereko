import {
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
    tags: text("tags"),
    created_at: date("created_at").defaultNow(),
    updated_at: date("updated_at").defaultNow(),
  },
  (projects) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(projects.title),
    };
  },
);

export type Project = typeof Projects.$inferSelect;
export type Projects = (typeof Projects.$inferSelect)[];
