import React from "react";

import { YoutubePlayer } from "@/lib/video/player";
import { type Event } from "@/server/db/schemas/events";

import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";

interface EventItemProps {
  title?: string;
  event: Event;
}

const EventItem = async ({ title, event }: EventItemProps) => {
  const origin = process.env.VERCEL_URL!;

  if (!origin) {
    console.error("event origin is undefined or invalid: ", origin);
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
    <Card className="min-h-[18rem] bg-neutral-200 dark:bg-neutral-900">
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
