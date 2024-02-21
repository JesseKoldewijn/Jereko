import dynamic from "next/dynamic";

export const ClientListItems = {
  blog: {
    arrayPointer: null,
    itemArgs: ["blog"],
    component: dynamic(() => import("@/components/listers/BlogListerItem"), {
      ssr: true,
    }),
  },
};
