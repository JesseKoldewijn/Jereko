"use client";

import dynamic from "next/dynamic";

export const AnimatedIntroSection1 = dynamic(
  () => import("./_content").then((mod) => mod.AnimatedIntroSection1),

  {
    ssr: true,
  },
);

export const AnimatedIntroSection2 = dynamic(
  () => import("./_content").then((mod) => mod.AnimatedIntroSection2),
  {
    ssr: true,
  },
);

export const AnimatedIntroSection3 = dynamic(
  () => import("./_content").then((mod) => mod.AnimatedIntroSection3),
  {
    ssr: true,
  },
);
