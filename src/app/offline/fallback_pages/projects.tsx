"use client";

import type { Metadata } from "next";
import { Suspense, useEffect, useState } from "react";

import dynamic from "next/dynamic";

import ProjectsLister from "@/components/listers/ProjectsLister";
import BannerProjects from "@/images/banner-programming.webp";
import { type Project } from "@/server/db/schemas/projects";
import { getStore } from "@/store/local-store";

const HeroSection = dynamic(
  () => import("@/components/layout/sections/HeroSection"),
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

const OfflineProjectsPage = () => {
  const [localProjects, setLocalProjects] = useState<Project[]>([]);

  useEffect(() => {
    const getProjects = async () => {
      const store = await getStore("projects");
      setLocalProjects(store.data);
    };

    getProjects();
  }, []);

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
            <ProjectsLister projectsOverride={localProjects} />
          </Suspense>
        </section>
      </div>
    </>
  );
};

export default OfflineProjectsPage;
