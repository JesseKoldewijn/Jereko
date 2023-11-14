"use client";

import Embed from "./_embed";

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
      <Embed
        playerID={playerID}
        youtubeVideoID={youtubeVideoID}
        srcUrl={srcUrl}
      />
    </div>
  );
};
