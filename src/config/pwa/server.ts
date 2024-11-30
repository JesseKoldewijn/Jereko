import type withSerwistInit from "@serwist/next";

type InjectManifestOptions = Parameters<typeof withSerwistInit>[0];

// serwist init config
export const serwistInitConfig: InjectManifestOptions = {
  cacheOnNavigation: true,
  swSrc: "src/app/app-worker.ts",
  swDest: "public/app-worker.js",
  swUrl: "/app-worker.js",
  reloadOnOnline: true,
  register: false,
  disable: process.env.NODE_ENV !== "production",
};
