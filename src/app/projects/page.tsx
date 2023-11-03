import { type Metadata } from "next";

import HeroSection from "@/components/layout/sections/HeroSection";
import ProjectsLister from "@/components/listers/ProjectsLister";
import BannerProjects from "@/images/banner-programming.webp";

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
          <ProjectsLister />
        </section>
      </div>
    </>
  );
};

export default ProjectsPage;
