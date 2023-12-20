import React from "react";

import { YoutubePlayer } from "@/lib/video/player";
import { type Event } from "@/server/db/schemas/events";

import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

type EventItemProps =
  | {
      title?: string;
      event: Event;
      isSkeleton?: boolean;
    }
  | {
      title?: string;
      event?: Event;
      isSkeleton: true;
    };

const EventItem = ({ title, event, isSkeleton }: EventItemProps) => {
  if (isSkeleton) {
    return (
      <Card className="min-h-[18rem] bg-neutral-100 !pb-8 dark:bg-neutral-900">
        <CardTitle className="my-3 !mb-1 mt-2 flex flex-col gap-6 !pt-3">
          <Skeleton className="bg-neutral-322 mx-auto my-auto h-4 w-4/6 dark:bg-neutral-700" />
          <Skeleton className="bg-neutral-322 relative mx-auto my-auto h-3 w-5/6 dark:bg-neutral-700" />
        </CardTitle>

        <CardContent className="!mb-2 mt-4 flex flex-1 flex-col items-center !pb-2">
          <Skeleton
            id="loading-skeleton"
            className="bg-neutral-322 absolute mx-auto my-auto h-full max-h-[182px] w-full max-w-[322px] dark:bg-neutral-700"
          />
        </CardContent>
      </Card>
    );
  }

  const origin = process.env.VERCEL_URL!;

  if (!origin || !event) {
    console.error("event origin is undefined or invalid: ", origin);
    return null;
  }

  const eventDate =
    event.year !== null && event.month !== null
      ? " - " +
        new Date(
          parseInt(event.year),
          parseInt(event.month),
          0,
        ).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      : null;

  return (
    <Card className="min-h-[18rem] bg-neutral-100 dark:bg-neutral-900">
      {title ? (
        <>
          <CardTitle className="pt-4">{title}</CardTitle>
          <CardDescription className="my-4">
            {event.name}
            {eventDate}
          </CardDescription>
        </>
      ) : (
        <CardTitle className="pt-4">{event.name}</CardTitle>
      )}
      <CardContent className="flex flex-1 flex-col">
        {event.url_type == "video" && event.url ? (
          <YoutubePlayer url={event.url} origin={origin} />
        ) : null}
      </CardContent>
    </Card>
  );
};

export default EventItem;
