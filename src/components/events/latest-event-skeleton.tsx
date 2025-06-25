import React from "react";

import EventItem from "./event-item";

const LatestEventSkeleton = () => {
  return (
    <div className="mx-auto mt-8 w-full max-w-md px-4 md:px-0">
      <section id="last-event" className="my-4 flex flex-col gap-4 text-center">
        <EventItem title="Latest Attended Event" isSkeleton />
      </section>
    </div>
  );
};

export default LatestEventSkeleton;
