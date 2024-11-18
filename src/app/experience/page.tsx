import type { Metadata } from "next";

import HeroSection from "@/components/layout/sections/HeroSection";
import ExperienceLister from "@/components/listers/ExperienceLister";
import BannerProjects from "@/images/banner-programming.webp";
import { daysToMs } from "@/utils/datetime";

export const metadata: Metadata = {
  title: "Experience",
  description: "A list of what I've done over the years.",
  openGraph: {
    title: "Experience | Jereko",
    description: "A list of what I've done over the years.",
    url: "https://jereko.dev",
  },
};

export const revalidate = 604800000;

const ExperiencePage = async () => {
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

export default ExperiencePage;
