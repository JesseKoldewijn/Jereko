"use client";

import { useEffect } from "react";

interface YoutubeVideoWrapperProps {
  playerID: string;
  children: React.ReactNode;
}

const YoutubeVideoWrapper = ({
  playerID,
  children,
}: YoutubeVideoWrapperProps) => {
  useEffect(() => {
    const player = document.getElementById(playerID);
    const innerPlayerElem = player?.getElementsByTagName("lite-youtube")[0];

    if (innerPlayerElem) {
      const skeleton = document.getElementById(playerID + "-skeleton");

      if (!skeleton) return;

      setTimeout(() => {
        skeleton.style.display = "none";
        player.style.opacity = "1";
        player.style.zIndex = "0";
      }, 1000);
    }
  }, [playerID]);

  return <>{children}</>;
};

export default YoutubeVideoWrapper;
