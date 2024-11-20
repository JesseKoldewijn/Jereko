"use client";

import dynamic_import from "next/dynamic";

export const LatestAttendedWrapperDynamic = dynamic_import(
  () => import("@/components/events/last-attended-client-wrapper"),
  {
    ssr: false,
  },
);
