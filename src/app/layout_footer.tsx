"use client";

import dynamic from "next/dynamic";

export const TechUsedSectionNew = dynamic(
  () => import("@/components/layout/footer/tech-used"),
  {
    ssr: false,
  },
);
