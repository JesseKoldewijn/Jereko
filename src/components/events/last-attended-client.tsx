"use client";

import { useQuery } from "@tanstack/react-query";

import dynamic_import from "next/dynamic";

import type { mostRecentEvent } from "@/server/handlers/events/getLatest";

const EventItem = dynamic_import(() => import("./event-item"));

const getData = async () => {
  return await fetch("/api/events/latest", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (!res.ok) {
      console.error("Error fetching data");
      return null;
    }
    const data = await res.json();
    return data as Awaited<ReturnType<typeof mostRecentEvent>>;
  });
};

const LastAttendedEvent = () => {
  const { data: latestEvent, isLoading } = useQuery({
    queryKey: ["latest-event"],
    queryFn: getData,
  });

  return (
    <>
      {isLoading ? (
        <div className="mx-auto mt-8 w-full max-w-md px-4 md:px-0">
          <section
            id="last-event"
            className="my-4 flex flex-col gap-4 text-center"
          >
            <EventItem title="Latest Attended Event" isSkeleton />
          </section>
        </div>
      ) : latestEvent ? (
        <div className="mx-auto mt-8 w-full max-w-md px-4 md:px-0">
          <section
            id="last-event"
            className="my-4 flex flex-col gap-4 text-center"
          >
            <EventItem title="Latest Attended Event" event={latestEvent} />
          </section>
        </div>
      ) : (
        <p className="min-h-[352px] py-8 text-muted-foreground">
          Nothing here for now, sorry
        </p>
      )}
    </>
  );
};

export default LastAttendedEvent;
