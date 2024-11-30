"use client";

import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import type { Serwist } from "serwist";

type SerwistInstanceProps = ConstructorParameters<typeof Serwist>[0];

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

// sw global scope instance
declare const self: ServiceWorkerGlobalScope;

// serwist app-worker client config
export const serwistConfig: SerwistInstanceProps = {
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
  fallbacks: {
    entries: [
      {
        url: "/~offline", // the page that'll display if user goes offline
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
};
