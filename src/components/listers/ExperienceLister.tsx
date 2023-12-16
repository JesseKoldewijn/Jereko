import { db } from "@/server/db/conn";
import { type Experience, Experiences } from "@/server/db/schemas/experience";

import ExperienceListerItem from "./ExperienceListerItem";

const ExperienceLister = async ({
  experienceOverride,
}: {
  experienceOverride?: Experience[];
}) => {
  const experience =
    experienceOverride ?? (await db.select().from(Experiences).execute());

  return (
    <div className="flex flex-col gap-4">
      {experience && experience.length > 0 ? (
        <>
          {experience
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
            })}
        </>
      ) : (
        <>No experiences found</>
      )}
    </div>
  );
};

export default ExperienceLister;
