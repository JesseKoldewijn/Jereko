import { type Metadata } from "next";

// @ts-ignore
import { YouTubeEmbed } from "@next/third-parties/google";

import HeroSection from "@/components/layout/sections/HeroSection";
import Avatar from "@/images/avatar.webp";

export const revalidate = 86400;

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
          <div className="mx-auto h-[225px] max-h-[225px] w-auto">
            <YouTubeEmbed
              videoid="FdiX5rHS_0Y"
              width={400}
              params="controls=0"
              playlabel="Play: Last Attended Event"
            />
          </div>
          <span className="italic">{"NextConf '23"}</span>
        </section>
      </div>
    </>
  );
};

export default Home;
