import { mostRecentEvent } from "@/data/queries";

import EventItem from "./event-item";

export const LastAttendedEvent = () => {
  const latestEvent = mostRecentEvent();

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
      ) : (
        <p className="text-muted-foreground py-4">
          Nothing here for now, sorry
        </p>
      )}
    </>
  );
};
