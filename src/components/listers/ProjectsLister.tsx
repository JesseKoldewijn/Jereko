import { db } from "@/server/db/conn";
import { type Project, Projects } from "@/server/db/schemas/projects";

import { StoreInjector } from "../store-injector";
import ProjectListerItem from "./ProjectListerItem";

export interface ProjectsListerProps {
  projectsOverride?: Project[];
}

const ProjectsLister = async ({ projectsOverride }: ProjectsListerProps) => {
  const projects =
    projectsOverride ?? (await db.select().from(Projects).execute());

  return (
    <div className="flex flex-col gap-4">
      {projects && projects.length > 0 ? (
        <>
          <StoreInjector namespace="projects" data={projects} />
          {projects.flatMap((project) => {
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
