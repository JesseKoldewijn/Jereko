import dynamic from "next/dynamic";

import { mostRecentEvent } from "@/server/handlers/events/getLatest";

const EventItem = dynamic(() => import("@/components/events/event-item"), {
  ssr: true,
});

const LastAttendedEvent = async () => {
  const latestEvent = await mostRecentEvent();

  return (
    <>
      {latestEvent ? (
        <div className="mx-auto mt-8 w-auto max-w-md px-4 md:w-full md:px-0">
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

export default LastAttendedEvent;
