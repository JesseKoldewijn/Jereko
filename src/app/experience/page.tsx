import type { Metadata } from "next";
import { Suspense } from "react";

import dynamic from "next/dynamic";

import ExperienceLister from "@/components/listers/ExperienceLister";
import BannerProjects from "@/images/banner-programming.webp";

const HeroSection = dynamic(
  () => import("@/components/layout/sections/HeroSection"),
  {
    ssr: true,
  },
);

export const metadata: Metadata = {
  title: "Experience",
  description: "A list of what I've done over the years.",
  openGraph: {
    title: "Experience | Jereko",
    description: "A list of what I've done over the years.",
    url: "https://jereko.dev",
  },
};

const ExperiencePage = () => {
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

export default ExperiencePage;
