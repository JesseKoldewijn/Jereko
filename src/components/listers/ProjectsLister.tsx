import { db } from "@/server/db/conn";
import { Projects } from "@/server/db/schemas/projects";

import ProjectListerItem from "./ProjectListerItem";

const ProjectsLister = async () => {
  const projects = await db.select().from(Projects).execute();

  return (
    <div className="flex flex-col gap-4">
      {projects && projects.length > 0 ? (
        projects.flatMap((project) => {
          return (
            <div key={project.id}>
              <ProjectListerItem project={project} />
            </div>
          );
        })
      ) : (
        <>No projects found</>
      )}
    </div>
  );
};

export default ProjectsLister;
