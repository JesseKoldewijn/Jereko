import { registerSW } from "virtual:pwa-register";

import { useEffect } from "react";

/**
 * Bump when you need every client to drop the current SW + Workbox caches once
 * (e.g. bad precache manifest, breaking SW change).
 */
const PWA_MIGRATION_VERSION = "navigate-fallback-offline-path-v2";
const PWA_MIGRATION_KEY = "jereko-pwa-migration";

/** Ensures migration + `registerSW` run once per tab (Strict Mode runs effects twice in dev). */
let pwaClientInitStarted = false;

async function runPwaMigrationOnce(): Promise<boolean> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return false;
  }
  try {
    if (localStorage.getItem(PWA_MIGRATION_KEY) === PWA_MIGRATION_VERSION) {
      return false;
    }
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((r) => r.unregister()));
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter(
            (name) =>
              name.includes("workbox") ||
              name.includes("precache") ||
              name.startsWith("google-offline"),
          )
          .map((name) => caches.delete(name)),
      );
    }
    localStorage.setItem(PWA_MIGRATION_KEY, PWA_MIGRATION_VERSION);
    return registrations.length > 0;
  } catch {
    try {
      localStorage.setItem(PWA_MIGRATION_KEY, PWA_MIGRATION_VERSION);
    } catch {
      /* private mode */
    }
    return false;
  }
}

export default function PwaRegister() {
  useEffect(() => {
    if (pwaClientInitStarted) return;
    pwaClientInitStarted = true;

    void (async () => {
      const hadServiceWorker = await runPwaMigrationOnce();
      if (hadServiceWorker) {
        window.location.reload();
        return;
      }
      registerSW({ immediate: true });
    })();
  }, []);
  return null;
}
