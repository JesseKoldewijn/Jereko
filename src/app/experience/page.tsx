import { type Metadata } from "next";

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

export const revalidate = 86400; // 24 hours

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
