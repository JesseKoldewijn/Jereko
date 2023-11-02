import { type ServerRuntime } from "next";
import React, { Suspense } from "react";

import { type Revalidate } from "next/dist/server/lib/revalidate";

import HeroSection from "@/components/layout/sections/HeroSection";
import ExperienceLister from "@/components/listers/ExperienceLister";
import BannerProjects from "@/images/banner-programming.webp";

export const runtime: ServerRuntime = "edge";
export const revalidate: Revalidate = 86400;

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
      <div className="mt-8 w-auto max-w-md px-4 md:mx-auto md:w-full md:px-0">
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
