import { type Metadata } from "next";

import dynamic from "next/dynamic";

import Avatar from "@/images/avatar.webp";

const HeroSection = dynamic(
  () => import("@/components/layout/sections/HeroSection"),
  {
    ssr: true,
  },
);

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
      <div className="mt-8 w-auto max-w-md px-4 md:mx-auto md:w-full md:px-0">
        <section
          id="last-event"
          className="my-4 flex flex-col gap-4 text-center"
        >
          <span>Last Attended Event</span>
          <span className="italic">{"NextConf '23"}</span>
        </section>
      </div>
    </>
  );
};

export default Home;
