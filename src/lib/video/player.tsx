"use client";

import { Suspense, useState } from "react";

import { LuPlay } from "@/icons/lu/Play";

import PlaceholderImage from "@/images/player-placeholder.webp";

import { cn } from "../utils";
import Embed from "./_embed";
import { getYoutubeVideoId } from "./youtube-id";

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

  const youtubeVideoID = getYoutubeVideoId(url);
  if (!youtubeVideoID) {
    return null;
  }

  const playerID = `youtube-player-[${youtubeVideoID}]${
    key !== undefined ? `-${key}` : ""
  }`;

  const srcUrl = `https://www.youtube.com/embed/${youtubeVideoID}?autoplay=1&mute=1&enablejsapi=0&controls=0&origin=${origin}`;
  /** Built by `yarn fetch-external-images` before production build. */
  const localThumbnailSrc = `/images/external/youtube/${youtubeVideoID}.jpg`;
  const remoteThumbnailSrc = `https://img.youtube.com/vi/${youtubeVideoID}/hqdefault.jpg`;

  const Player = () => (
    <Embed
      playerID={playerID}
      youtubeVideoID={youtubeVideoID}
      srcUrl={srcUrl}
      className="mx-auto my-auto h-full max-h-[182px] w-full max-w-[322px]"
    />
  );

  const placeholderSrc =
    typeof PlaceholderImage === "string"
      ? PlaceholderImage
      : ((PlaceholderImage as { src?: string }).src ?? "");

  const Thumbnail = () => (
    <>
      <img
        className="sm mx-auto my-auto aspect-video h-full max-h-[182px] w-full max-w-[322px] object-cover"
        src={localThumbnailSrc}
        alt="video thumbnail"
        onError={(e) => {
          const el = e.currentTarget;
          const step = el.dataset.thumbStep ?? "local";
          if (step === "local") {
            el.dataset.thumbStep = "remote";
            el.src = remoteThumbnailSrc;
            return;
          }
          el.src = placeholderSrc;
        }}
      />
      <button
        onClick={() => setClicked(true)}
        className="absolute top-1/2 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform items-center justify-items-center rounded-full bg-[rgba(255,0,0,0.75)] align-middle hover:bg-[rgba(0,0,0,0.75)]"
      >
        <LuPlay className="mx-auto fill-white text-white" />
        <span className="sr-only">Click here to play video</span>
      </button>
    </>
  );

  return (
    <div key={playerID} className="mx-auto my-auto flex flex-1">
      <div
        className={cn(
          !clicked && "relative",
          "xs:min-w-[350px] flex max-h-[182px] min-h-[182px] w-full max-w-[322px] min-w-[calc(100svw-6rem)] items-center",
        )}
      >
        <Suspense>{clicked ? <Player /> : <Thumbnail />}</Suspense>
      </div>
    </div>
  );
};
