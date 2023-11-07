// @ts-ignore-next-line
import { YouTubeEmbed } from "@next/third-parties/google";

import { Skeleton } from "@/components/ui/skeleton";

import YoutubeVideoWrapper from "./wrapper";

export const YoutubePlayer = ({ key, url }: { key?: string; url: string }) => {
  const youtubeVideoID = url.split("v=")[1];
  const playerID = `youtube-player-[${youtubeVideoID}]${
    key !== undefined ? `-${key}` : ""
  }`;

  return (
    <YoutubeVideoWrapper playerID={playerID}>
      <div className="relative mx-auto flex">
        <Skeleton
          id={playerID + "-skeleton"}
          className="absolute mx-auto h-[175px] w-[300px] bg-neutral-300 dark:bg-neutral-700"
        />
        <div
          id={playerID}
          className="-z-50 mx-auto h-[175px] w-[300px]"
          style={{ opacity: 0 }}
          data-elem-type="player-loader"
        >
          <YouTubeEmbed
            key={youtubeVideoID}
            videoid={youtubeVideoID}
            height={175}
            width={300}
            params="controls=0"
          />
        </div>
      </div>
    </YoutubeVideoWrapper>
  );
};
