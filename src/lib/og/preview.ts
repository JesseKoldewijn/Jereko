import dynamic from "next/dynamic";

const isServer = typeof window === "undefined";
export const OpenGraphPreview = dynamic(() =>
  import("./preview-client").then((x) => x.OpenGraphPreview),
);
