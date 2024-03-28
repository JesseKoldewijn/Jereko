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
    start_year: text("start_year"),
    start_month: text("start_month"),
    end_year: text("end_year"),
    end_month: text("end_month"),
    created_at: date("created_at").defaultNow(),
    updated_at: date("updated_at").defaultNow(),
  },
  (x) => {
    return {
      expIdx: uniqueIndex("exp_idx").on(x.title),
    };
  },
);

export type Experience = typeof Experiences.$inferSelect;
export type Experiences = (typeof Experiences.$inferSelect)[];
