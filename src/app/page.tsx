import { type Metadata } from "next";
import { Suspense } from "react";

import dynamic from "next/dynamic";

import Avatar from "@/images/avatar.webp";
import { YoutubePlayer } from "@/lib/video/player";
import { mostRecentEvent } from "@/server/handlers/events/getLatest";

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
  const latestEvent = await mostRecentEvent();

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
      <div className="mx-auto mt-8 w-auto max-w-md px-4 md:w-full md:px-0">
        <Suspense>
          <section
            id="last-event"
            className="my-4 flex flex-col gap-4 text-center"
          >
            <span>Last Attended Event</span>
            <span className="italic">{latestEvent.name}</span>
            {latestEvent.url_type == "video" && latestEvent.url ? (
              <YoutubePlayer url={latestEvent.url} />
            ) : null}
          </section>
        </Suspense>
      </div>
    </>
  );
};

export default Home;
