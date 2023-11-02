import { db } from "@/server/db/conn";
import { Experiences } from "@/server/db/schemas/experience";

import ProjectListerItem from "./ExperienceListerItem";

export const revalidate = 86400; // 1 day in seconds

const ProjectsLister = async () => {
  const experience = await db.select().from(Experiences).execute();

  return (
    <div className="flex flex-col gap-4">
      {experience && experience.length > 0 ? (
        experience.flatMap((exp) => {
          return (
            <div key={exp.id}>
              <ProjectListerItem experience={exp} />
            </div>
          );
        })
      ) : (
        <>No experiences found</>
      )}
    </div>
  );
};

export default ProjectsLister;
