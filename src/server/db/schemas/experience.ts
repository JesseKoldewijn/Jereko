import {
  date,
  pgTable,
  text,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const Experiences = pgTable(
  "experiences",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("job_title"),
    company_name: text("company_name"),
    location: text("location"),
    description: varchar("description"),
    skills: text("skills"),
    start_year: date("start_year"),
    start_month: date("start_month"),
    end_year: date("end_year"),
    end_month: date("end_month"),
    created_at: date("created_at").defaultNow(),
    updated_at: date("updated_at").defaultNow(),
  },
  (projects) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(projects.title),
    };
  },
);

export type Experience = typeof Experiences.$inferSelect;
export type Experiences = (typeof Experiences.$inferSelect)[];
