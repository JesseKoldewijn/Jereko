import type { Metadata, ServerRuntime } from "next";
import { Suspense } from "react";

import dynamic from "next/dynamic";

import BannerProjects from "@/images/banner-programming.webp";

const HeroSection = dynamic(
  () => import("@/components/layout/sections/HeroSection"),
  {
    ssr: true,
  },
);

const ExperienceLister = dynamic(
  () => import("@/components/listers/ExperienceLister"),
  {
    ssr: true,
  },
);

export const runtime: ServerRuntime = "edge";

export const metadata: Metadata = {
  openGraph: {
    title: "Projects | JKinsight",
    description: "A list of what I've done over the years.",
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
          title: "Experience",
          description: "A list of what I've done over the years.",
        }}
      />
      <div className="mx-auto mt-8 w-auto max-w-md px-4 md:w-full md:px-0">
        <section>
          <Suspense>
            <ExperienceLister />
          </Suspense>
        </section>
      </div>
    </>
  );
};

export default ProjectsPage;
