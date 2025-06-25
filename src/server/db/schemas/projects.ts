import {
  bigint,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

export const projects = mysqlTable(
  "projects",
  {
    id: bigint("id", {
      mode: "number",
    })
      .primaryKey()
      .autoincrement(),
    title: text("title"),
    sub_title: text("sub_title"),
    description: text("description"),
    link: text("link"),
    tags: text("tags"),
    draft: text("draft"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  },
  (x) => {
    return {
      titleIdx: uniqueIndex("title_idx").on(x.title),
    };
  },
);

export type Project = typeof projects.$inferSelect;
export type Projects = (typeof projects.$inferSelect)[];
export type ProjectInsert = typeof projects.$inferInsert;
