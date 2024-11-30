"use client";

import dynamic from "next/dynamic";

export const TextGen = dynamic(
  () => import("./text-gen").then((x) => x.INTERNAL_TextGenComponent),
  {
    ssr: false,
  },
);
