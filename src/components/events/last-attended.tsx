import dynamic from "next/dynamic";

import { mostRecentEvent } from "@/server/handlers/events/getLatest";

import EventItem from "./event-item";

const LastAttendedEvent = async () => {
  const latestEvent = await mostRecentEvent();

  return (
    <>
      {latestEvent ? (
        <div className="mx-auto mt-8 w-full max-w-md px-4 md:px-0">
          <section
            id="last-event"
            className="my-4 flex flex-col gap-4 text-center"
          >
            <EventItem title="Latest Attended Event" event={latestEvent} />
          </section>
        </div>
      ) : null}
    </>
  );
};

export const LatestAttendedEventLazy = dynamic(
  () => import("@/components/events/last-attended"),
  {
    ssr: false,
    loading: () => (
      <>
        <div className="mx-auto mt-8 w-full max-w-md px-4 md:px-0">
          <section
            id="last-event"
            className="my-4 flex flex-col gap-4 text-center"
          >
            <EventItem title="Latest Attended Event" isSkeleton />
          </section>
        </div>
      </>
    ),
  },
);

export default LastAttendedEvent;
