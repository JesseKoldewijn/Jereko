import {
  bigint,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

export const experiences = mysqlTable(
  "experiences",
  {
    id: bigint("id", {
      mode: "number",
    })
      .primaryKey()
      .autoincrement(),
    title: text("job_title"),
    company_name: text("company_name"),
    location: text("location"),
    description: text("description"),
    skills: text("skills"),
    start_year: text("start_year"),
    start_month: text("start_month"),
    end_year: text("end_year"),
    end_month: text("end_month"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  },
  (x) => {
    return {
      expIdx: uniqueIndex("exp_idx").on(x.title),
    };
  },
);

export type Experience = typeof experiences.$inferSelect;
export type Experiences = (typeof experiences.$inferSelect)[];
