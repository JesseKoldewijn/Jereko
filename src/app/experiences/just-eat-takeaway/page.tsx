import { eq } from "drizzle-orm";

import { unstable_cache } from "next/cache";

import { db } from "@/server/db/conn";
import { experiences } from "@/server/db/schemas/experience";

import JetCard from "./components/layout/JetCard";

const JustEatTakeawayJobPage = async () => {
  const experiencePromise = unstable_cache(async () => {
    return await db
      .select()
      .from(experiences)
      .where(eq(experiences.company_name, "Just Eat Takeaway.com"))
      .execute();
  });
  const experience = await experiencePromise();

  if (!experience || experience.length === 0) {
    return (
      <JetCard padding="d,d" className="dark:invert">
        <h1>No Job Experience Found</h1>
        <p>
          It seems that there is no job experience listed for Just Eat
          Takeaway.com. Please check back later or contact us for more
          information.
        </p>
      </JetCard>
    );
  }

  const exp = experience.at(0)!;

  return (
    <section className="mx-auto flex min-h-[90svh] w-auto max-w-md flex-col items-center justify-center px-4 md:w-full md:px-0">
      <JetCard padding="d,d" className="dark:invert">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-start gap-1">
            <strong className="font-bold">{exp.title}</strong>
            <i>{exp.company_name}</i>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-start gap-1">
              <strong>Location:</strong> {exp.location}
            </div>
            <div className="flex items-start gap-1">
              <strong>Start Date:</strong>{" "}
              {new Date(
                `${exp.start_year}-${String(exp.start_month).padStart(2, "0")}-01`,
              ).toLocaleDateString()}
            </div>
            <div className="flex items-start gap-1">
              <strong>End Date:</strong>{" "}
              {exp.end_year
                ? new Date(
                    `${exp.end_year}-${String(exp.end_month).padStart(2, "0")}-01`,
                  ).toLocaleDateString()
                : "Present"}
            </div>
          </div>

          <p>{exp.description}</p>
        </div>
      </JetCard>
    </section>
  );
};

export default JustEatTakeawayJobPage;
