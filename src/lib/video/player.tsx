"use client";

import { Suspense } from "react";

import dynamic from "next/dynamic";

import { Skeleton } from "@/components/ui/skeleton";

const Embed = dynamic(() => import("./_embed"), {
  ssr: false,
  loading: () => (
    <Skeleton
      id="loading-skeleton"
      className="bg-neutral-322 absolute mx-auto my-auto h-full max-h-[182px] w-full max-w-[322px] dark:bg-neutral-700"
    />
  ),
});

export const YoutubePlayer = ({
  key,
  url,
  origin,
}: {
  key?: string;
  url: string;
  origin: string;
}) => {
  const youtubeVideoID = url.split("v=")[1]!;
  const playerID = `youtube-player-[${youtubeVideoID}]${
    key !== undefined ? `-${key}` : ""
  }`;

  const srcUrl = `https://www.youtube.com/embed/${youtubeVideoID}?autoplay=0&mute=1&enablejsapi=0&controls=0&origin=${origin}'`;

  return (
    <div key={playerID} className="relative mx-auto my-auto flex flex-1">
      <Suspense
        fallback={
          <Skeleton
            id="loading-skeleton"
            className="bg-neutral-322 absolute mx-auto my-auto h-full max-h-[182px] w-full max-w-[322px] dark:bg-neutral-700"
          />
        }
      >
        <Embed
          playerID={playerID}
          youtubeVideoID={youtubeVideoID}
          srcUrl={srcUrl}
        />
      </Suspense>
    </div>
  );
};
