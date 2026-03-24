import tailwind from "@astrojs/tailwind";
import AstroPWA from "@vite-pwa/astro";
import { defineConfig } from "astro/config";
import tsconfigPaths from "vite-tsconfig-paths";

import react from "@astrojs/react";

export default defineConfig({
  output: "static",
  site: "https://jereko.dev",
  integrations: [
    react(),
    tailwind(),
    AstroPWA({
      registerType: "autoUpdate",
      workbox: {
        // Must match precache URL (Workbox lists `offline` → https://origin/offline, not /offline/).
        navigateFallback: "/offline",
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,avif,woff2}"],
        // Astro emits /404.html; Workbox maps it to URL "404" which is not served (404).
        globIgnores: ["**/404.html", "404.html"],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
      },
      devOptions: { enabled: false },
    }),
  ],
  vite: {
    plugins: [tsconfigPaths()],
  },
});
