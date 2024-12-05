"use client";

import dynamic from "next/dynamic";

export const ReactScanLoader = dynamic(() => import("@/utils/react-scan"), {
  ssr: false,
});
