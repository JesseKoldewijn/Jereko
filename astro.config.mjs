import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import AstroPWA from "@vite-pwa/astro";
import { defineConfig } from "astro/config";
import { visualizer } from "rollup-plugin-visualizer";
import tsconfigPaths from "vite-tsconfig-paths";

import react from "@astrojs/react";

export default defineConfig({
  output: "static",
  site: "https://jereko.dev",
  prefetch: {
    defaultStrategy: "viewport",
    prefetchAll: true,
  },
  image: {
    domains: ["img.youtube.com"],
  },
  integrations: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    sitemap(),
    AstroPWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Jereko",
        short_name: "Jereko",
        description:
          "Jesse Koldewijn — personal site: projects, experience, and events.",
        lang: "en",
        start_url: "/",
        scope: "/",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#fafafa",
        icons: [
          {
            src: "/favicons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/favicons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/favicons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // Must match precache URL (Workbox lists `offline` → https://origin/offline, not /offline/).
        navigateFallback: "/offline",
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,avif,woff2}"],
        // Astro emits /404.html; Workbox maps it to URL "404" which is not served (404).
        globIgnores: ["**/404.html", "404.html", "**/bundle-stats.html"],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
      },
      devOptions: { enabled: false },
    }),
  ],
  vite: {
    plugins: [
      tailwindcss(),
      tsconfigPaths(),
      /** @type {any} */ (
        visualizer({
          filename: "dist/bundle-stats.html",
          open: false,
          gzipSize: true,
        })
      ),
    ],
  },
});
