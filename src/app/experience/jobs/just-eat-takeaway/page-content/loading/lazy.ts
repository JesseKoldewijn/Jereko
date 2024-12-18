"use client";

import dynamic from "next/dynamic";

export const JetJobPageLoader = dynamic(() => import("."), {
  ssr: false,
});
