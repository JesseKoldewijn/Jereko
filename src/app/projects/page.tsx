import React, { Suspense } from "react";

import ProjectsLister from "@/components/listers/ProjectsLister";

const ProjectsPage = () => {
  return (
    <div className="mx-4 w-full max-w-md md:mx-auto">
      <h1>Projects</h1>
      <section>
        <Suspense fallback={<>...</>}>
          <ProjectsLister />
        </Suspense>
      </section>
    </div>
  );
};

export default ProjectsPage;
