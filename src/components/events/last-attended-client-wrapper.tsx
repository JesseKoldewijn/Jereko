"use client";

import dynamic_import from "next/dynamic";

import { useQuery } from "@tanstack/react-query";

import type { mostRecentEvent } from "@/server/handlers/events/getLatest";

const LatestAttendedEvent = dynamic_import(
  () => import("@/components/events/last-attended-client"),
);

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

const LatestAttendedWrapper = () => {
  const { data: firstEvent, isLoading } = useQuery({
    queryKey: ["latest-event"],
    queryFn: getData,
  });

  return (
    <>
      {!isLoading && firstEvent && (
        <section className="mx-auto flex w-full max-w-lg flex-col items-center text-center">
          <h3 className="text-md px-2 font-semibold md:text-xl">
            Speaking about events I&apos;ve attended...
          </h3>
          <p className="mt-4 px-2 text-neutral-600 dark:text-neutral-200">
            Down below is the latest event I&apos;ve attended
          </p>
          <LatestAttendedEvent />
        </section>
      )}
    </>
  );
};

export default LatestAttendedWrapper;
