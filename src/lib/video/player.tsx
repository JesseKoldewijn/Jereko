"use client";

import YouTube from "react-youtube";

import { Skeleton } from "@/components/ui/skeleton";

import YoutubeVideoWrapper from "./wrapper";

export const YoutubePlayer = ({ key, url }: { key?: string; url: string }) => {
  const youtubeVideoID = url.split("v=")[1];
  const playerID = `youtube-player-[${youtubeVideoID}]${
    key !== undefined ? `-${key}` : ""
  }`;

  const options = {
    height: 182,
    width: 322,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      controls: 0,
    },
  };

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
          <YouTube
            key={youtubeVideoID}
            videoId={youtubeVideoID}
            className="mx-auto max-h-[182px] max-w-[322px]"
            opts={options}
          />
        </div>
      </div>
    </YoutubeVideoWrapper>
  );
};
