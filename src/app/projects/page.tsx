import { type Metadata } from "next";
import { Suspense } from "react";

import dynamic from "next/dynamic";

import BannerProjects from "@/images/banner-programming.webp";

const HeroSection = dynamic(
  () => import("@/components/layout/sections/HeroSection"),
  {
    ssr: true,
  },
);

const ProjectsLister = dynamic(
  () => import("@/components/listers/ProjectsLister"),
  {
    ssr: true,
  },
);

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
