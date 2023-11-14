"use client";

import { useEffect } from "react";

import { Skeleton } from "@/components/ui/skeleton";

interface EmbedProps {
  srcUrl: string;
  youtubeVideoID: string;
  playerID: string;
}

const _Embed = ({ playerID, youtubeVideoID, srcUrl }: EmbedProps) => {
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
    <>
      <Skeleton
        id={playerID + "-skeleton"}
        className="bg-neutral-322 absolute mx-auto my-auto h-full max-h-[182px] w-full max-w-[322px] dark:bg-neutral-700"
      />
      <div
        id={playerID}
        className="-z-50 mx-auto my-auto h-auto max-h-[182px] min-h-[182px] w-full max-w-[322px]"
        style={{ opacity: 0 }}
        data-elem-type="player-loader"
      >
        <embed
          key={youtubeVideoID}
          src={srcUrl}
          className="mx-auto my-auto h-full max-h-[182px] min-h-[182px] w-full max-w-[322px]"
          width={322}
          height={182}
        />
      </div>
    </>
  );
};

export default _Embed;
