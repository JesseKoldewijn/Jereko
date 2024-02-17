import type { Metadata, ServerRuntime } from "next";
import { Suspense } from "react";

import type { Revalidate } from "next/dist/server/lib/revalidate";

import HeroSection from "@/components/layout/sections/HeroSection";
import ExperienceLister from "@/components/listers/ExperienceLister";
import BannerProjects from "@/images/banner-programming.webp";

export const runtime: ServerRuntime = "edge"; // edge runtime for faster startup time
export const revalidate: Revalidate = 172800000; // 2 days in ms

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
