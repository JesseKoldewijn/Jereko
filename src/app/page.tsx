import { type Metadata } from "next";
import { Suspense } from "react";

import dynamic from "next/dynamic";

import LastAttendedEvent from "@/components/events/last-attended";
import Avatar from "@/images/avatar.webp";

const HeroSection = dynamic(
  () => import("@/components/layout/sections/HeroSection"),
  {
    ssr: true,
  },
);

export const revalidate = 86400; // 24 hours

export const metadata: Metadata = {
  openGraph: {
    title: "JKinsight",
    description: "My personal website.",
    url: "https://jkinsight.vercel.app",
  },
};

const Home = async () => {
  return (
    <>
      <HeroSection
        bannerImage={{
          dark: Avatar,
          light: Avatar,
        }}
        bannerContent={{
          title: "JKinsight",
          description: "My personal website.",
        }}
      />
      <Suspense>
        <LastAttendedEvent />
      </Suspense>
    </>
  );
};

export default Home;
