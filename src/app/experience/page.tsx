import { type Metadata } from "next";

import HeroSection from "@/components/layout/sections/HeroSection";
import ExperienceLister from "@/components/listers/ExperienceLister";
import BannerProjects from "@/images/banner-programming.webp";

export const runtime = "edge";

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
          <ExperienceLister />
        </section>
      </div>
    </>
  );
};

export default ProjectsPage;
