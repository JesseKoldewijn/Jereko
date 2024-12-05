import { unstable_cache } from "next/cache";

import { db } from "@/server/db/conn";
import { projects } from "@/server/db/schemas/projects";

import ProjectListerItem from "./ProjectListerItem";

const ProjectsLister = async () => {
  const projectsPromise = await unstable_cache(async () => {
    try {
      return await db.select().from(projects).execute();
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  const _projects = await projectsPromise();

  return (
    <div className="flex flex-col gap-4">
      {_projects && _projects.length > 0 ? (
        <>
          {_projects.reverse().flatMap((project) => {
            return (
              <div key={project.id}>
                <ProjectListerItem project={project} />
              </div>
            );
          })}
        </>
      ) : (
        <>No projects found</>
      )}
    </div>
  );
};

export default ProjectsLister;
