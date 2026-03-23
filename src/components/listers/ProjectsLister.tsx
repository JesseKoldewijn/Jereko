import { allProjects } from "@/data/queries";

import ProjectListerItem from "./ProjectListerItem";

const ProjectsLister = () => {
  const _projects = allProjects();

  return (
    <div className="flex flex-col gap-4">
      {_projects && _projects.length > 0 ? (
        <>
          {_projects.map((project, i) => (
            <div key={`${project.title}-${i}`}>
              <ProjectListerItem project={project} />
            </div>
          ))}
        </>
      ) : (
        <>No projects found</>
      )}
    </div>
  );
};

export default ProjectsLister;
