"use client";

import { Play } from "lucide-react";
import { useState } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import PlaceholderImage from "@/images/player-placeholder.webp";

export const YoutubePlayer = ({
  key,
  url,
  origin,
}: {
  key?: string;
  url: string;
  origin: string;
}) => {
  const [clicked, setClicked] = useState(false);

  const youtubeVideoID = url.split("v=")[1]!;
  const playerID = `youtube-player-[${youtubeVideoID}]${
    key !== undefined ? `-${key}` : ""
  }`;

  const srcUrl = `https://www.youtube.com/embed/${youtubeVideoID}?autoplay=1&mute=1&enablejsapi=0&controls=0&origin=${origin}'`;
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeVideoID}/hqdefault.jpg`;

  const LazyPlayer = () => {
    if (clicked === false)
      return (
        <div className="relative flex max-h-[182px] min-h-[182px] w-full min-w-[calc(100svw-6rem)] max-w-[322px] items-center xs:min-w-[350px]">
          <Image
            className="sm mx-auto my-auto aspect-video h-full max-h-[182px] w-full max-w-[322px] object-cover"
            src={thumbnailUrl}
            alt="video thumbnail"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              e.currentTarget.src = PlaceholderImage.src;
            }}
            priority={true}
            fill={true}
          />
          <button
            onClick={() => setClicked(true)}
            className="absolute left-1/2 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform items-center justify-items-center rounded-full bg-[rgba(255,0,0,0.75)] align-middle hover:bg-[rgba(0,0,0,0.75)]"
          >
            <Play className="ml-[calc(30%-2px)] mr-auto fill-white text-white" />
            <span className="sr-only">Click here to play video</span>
          </button>
        </div>
      );

    const Embed = dynamic(() => import("./_embed"), {
      ssr: false,
      loading: () => (
        <Skeleton
          id="loading-skeleton"
          className="bg-neutral-322 absolute mx-auto my-auto h-full max-h-[182px] w-full max-w-[322px] dark:bg-neutral-700"
        />
      ),
    });

    return (
      <Embed
        playerID={playerID}
        youtubeVideoID={youtubeVideoID}
        srcUrl={srcUrl}
      />
    );
  };

  return (
    <div key={playerID} className="relative mx-auto my-auto flex flex-1">
      <LazyPlayer />
    </div>
  );
};
