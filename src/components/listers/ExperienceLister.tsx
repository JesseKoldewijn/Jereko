import { db } from "@/server/db/conn";
import { Experiences } from "@/server/db/schemas/experience";

import ExperienceListerItem from "./ExperienceListerItem";

export const revalidate = 86400; // 1 day in seconds

const ExperienceLister = async () => {
  const experience = await db.select().from(Experiences).execute();

  return (
    <div className="flex flex-col gap-4">
      {experience && experience.length > 0 ? (
        experience
          .sort((a, b) => {
            const aDate = new Date(
              "01 " + a.start_month + " " + a.start_year,
            ).getTime();
            const bDate = new Date(
              "01 " + b.start_month + " " + b.start_year,
            ).getTime();

            return bDate - aDate;
          })
          .flatMap((exp) => {
            return (
              <div key={exp.id}>
                <ExperienceListerItem experience={exp} />
              </div>
            );
          })
      ) : (
        <>No experiences found</>
      )}
    </div>
  );
};

export default ExperienceLister;
