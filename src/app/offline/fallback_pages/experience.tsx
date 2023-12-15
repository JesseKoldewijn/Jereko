"use client";

import type { Metadata } from "next";
import { Suspense, useEffect, useState } from "react";

import dynamic from "next/dynamic";

import ExperienceLister from "@/components/listers/ExperienceLister";
import BannerProjects from "@/images/banner-programming.webp";
import { type Experience } from "@/server/db/schemas/experience";
import { getStore } from "@/store/local-store";

const HeroSection = dynamic(
  () => import("@/components/layout/sections/HeroSection"),
  {
    ssr: true,
  },
);

export const metadata: Metadata = {
  openGraph: {
    title: "Experience | JKinsight",
    description: "A list of what I've done over the years.",
    url: "https://jkinsight.vercel.app",
  },
};

const OfflineExperiencePage = () => {
  const [localExperience, setLocalExperience] = useState<Experience[]>([]);

  useEffect(() => {
    const getExperience = async () => {
      const store = await getStore("experience");
      setLocalExperience(store.data);
    };

    getExperience();
  }, []);

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
            <ExperienceLister experienceOverride={localExperience} />
          </Suspense>
        </section>
      </div>
    </>
  );
};

export default OfflineExperiencePage;
