import type { Metadata } from "next";
import { Suspense } from "react";

import type { Revalidate } from "next/dist/server/lib/revalidate";
import dynamic from "next/dynamic";

import ProjectsLister from "@/components/listers/ProjectsLister";
import BannerProjects from "@/images/banner-programming.webp";

const HeroSection = dynamic(
  () => import("@/components/layout/sections/HeroSection"),
  {
    ssr: true,
  },
);

export const revalidate: Revalidate = 172800000; // 2 days in ms

export const metadata: Metadata = {
  title: "Projects",
  description: "A list of projects I've worked on.",
  openGraph: {
    title: "Projects | Jereko",
    description: "A list of projects I've worked on.",
    url: "https://jereko.dev",
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
