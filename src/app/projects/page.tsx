import { type Metadata } from "next";
import React, { Suspense } from "react";

import HeroSection from "@/components/layout/sections/HeroSection";
import ProjectsLister from "@/components/listers/ProjectsLister";
import BannerProjects from "@/images/banner-programming.webp";

export const revalidate = 86400;

export const metadata: Metadata = {
  openGraph: {
    title: "Projects | JKinsight",
    description: "A list of projects I've worked on.",
    url: "https://jkinsight.vercel.app",
  },
};

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
        }}
      />
      <div className="mx-auto mt-8 w-auto max-w-md px-4 md:w-full md:px-0">
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
