"use client";

import { useEffect } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "../utils";

interface EmbedProps extends React.HTMLAttributes<HTMLDivElement> {
  srcUrl: string;
  youtubeVideoID: string;
  playerID: string;
}

const Embed = ({ playerID, youtubeVideoID, srcUrl, ...rest }: EmbedProps) => {
  const { className, ...props } = rest;

  const startShowing = () => {
    const skeleton = document.getElementById(playerID + "-skeleton");

    if (skeleton) {
      skeleton.style.opacity = "0";
      skeleton.style.transition = "opacity 1s ease-out";
      skeleton.style.display = "absolute";
    }

    const elem = document.getElementById(playerID)!;
    if (elem) {
      elem.style.opacity = "1";
      elem.style.transition = "opacity 1s ease-in";
      elem.style.zIndex = "1";
    }
  };

  useEffect(() => {
    setTimeout(() => {
      startShowing();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerID]);

  return (
    <div className={cn("relative flex flex-col", className)} {...props}>
      <Skeleton
        id={playerID + "-skeleton"}
        className="bg-neutral-322 absolute mx-auto my-auto h-full max-h-[182px] w-full dark:bg-neutral-700"
      />
      <div
        id={playerID}
        className="-z-50 mx-auto my-auto h-auto max-h-[182px] min-h-[182px] w-full"
        style={{ opacity: 0 }}
        data-elem-type="player-loader"
      >
        <embed
          key={youtubeVideoID}
          src={srcUrl}
          className="mx-auto my-auto h-full max-h-[182px] min-h-[182px] w-full"
          width={322}
          height={182}
        />
      </div>
    </div>
  );
};

export default Embed;
