"use client";

import { Skeleton } from "@/components/ui/skeleton";

import YoutubeVideoWrapper from "./wrapper";

export const YoutubePlayer = ({ key, url }: { key?: string; url: string }) => {
  const youtubeVideoID = url.split("v=")[1];
  const playerID = `youtube-player-[${youtubeVideoID}]${
    key !== undefined ? `-${key}` : ""
  }`;

  return (
    <YoutubeVideoWrapper playerID={playerID}>
      <div key={playerID} className="relative mx-auto flex">
        <Skeleton
          id={playerID + "-skeleton"}
          className="bg-neutral-322 absolute mx-auto h-[182px] w-[322px] dark:bg-neutral-700"
        />
        <div
          id={playerID}
          className="-z-50 mx-auto h-[182px] w-[322px]"
          style={{ opacity: 0 }}
          data-elem-type="player-loader"
        >
          <embed
            key={youtubeVideoID}
            src={`/api/remote/https://www.youtube.com/embed/${youtubeVideoID}?autoplay=1&mute=1&enablejsapi=1&controls=0&origin=https://jkinsight.vercel.app'`}
            className="mx-auto max-h-[182px] max-w-[322px]"
            width={322}
            height={182}
            // opts={options}
          />
        </div>
      </div>
    </YoutubeVideoWrapper>
  );
};
