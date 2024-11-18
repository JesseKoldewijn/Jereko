import { unstable_cache } from "next/cache";

import { db } from "@/server/db/conn";
import { type Experience, experiences } from "@/server/db/schemas/experience";

import ExperienceListerItem from "./ExperienceListerItem";

const ExperienceLister = async ({
  experienceOverride,
}: {
  experienceOverride?: Experience[];
}) => {
  const experiencePromise = unstable_cache(async () => {
    if (experienceOverride) return experienceOverride;
    return await db.select().from(experiences).execute();
  });
  const experience = await experiencePromise();

  return (
    <div className="flex flex-col gap-4">
      {experience && experience.length > 0 ? (
        <>
          {experience
            .sort((a, b) => {
              const aDate = new Date(
                a.start_year + "/" + a.start_month + "/01",
              ).getTime();
              const bDate = new Date(
                b.start_year + "/" + b.start_month + "/01",
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
