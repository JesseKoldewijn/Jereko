import React, { Suspense } from "react";

import HeroSection from "@/components/layout/sections/HeroSection";
import ProjectsLister from "@/components/listers/ProjectsLister";
import BannerProjects from "@/images/banner-programming.webp";

const ProjectsPage = () => {
  return (
    <>
      <HeroSection
        bannerImage={{
          dark: BannerProjects,
          light: BannerProjects,
        }}
        bannerContent={{
          title: "Projects",
          description: "A list of projects I've worked on.",
          ctas: [
            {
              title: "Contact me",
              url: "/contact",
            },
            {
              title: "About me",
              url: "/about",
            },
          ],
        }}
      />
      <div className="mt-8 w-auto max-w-md px-4 md:mx-auto md:w-full md:px-0">
        <section>
          <Suspense>
            <ProjectsLister />
          </Suspense>
        </section>
      </div>
    </>
  );
};

export default ProjectsPage;
