import type { MetadataRoute } from "next";

interface Manifest extends MetadataRoute.Manifest {
  iarc_rating_id?: string;
}

const rootManifest = () => {
  const manifest: Manifest = {
    // General Manifest Entries
    name: "Jereko",
    short_name: "Jereko",
    description:
      "My personal website, experience showcase and overview of attended events.",
    icons: [
      {
        src: "/favicons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    theme_color: "#000",
    background_color: "#DDD",
    // PWA specific
    id: "jereko-dev",
    dir: "ltr",
    lang: "en",
    scope: ".",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    categories: ["business", "social", "entertainment"], // app categories
    prefer_related_applications: false,
    iarc_rating_id: "13",
  };
  return manifest;
};

export default rootManifest;
