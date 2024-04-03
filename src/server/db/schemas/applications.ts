import {
  date,
  pgTable,
  text,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const Application = pgTable(
  "applications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug"),
    title: text("title"),
    content_html: varchar("content_html", {
      length: 5000,
    }),
    created_at: date("created_at").defaultNow(),
    updated_at: date("updated_at").defaultNow(),
  },
  (x) => {
    return {
      applicationIdx: uniqueIndex("application_idx").on(x.title),
      applicationSlugIdx: uniqueIndex("application_slug_idx").on(x.slug),
    };
  },
);

export type Application = typeof Application.$inferSelect;
export type Applications = (typeof Application.$inferSelect)[];
