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
        navigateFallback: "/offline",
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
      },
      devOptions: { enabled: false },
    }),
  ],
  vite: {
    plugins: [tsconfigPaths()],
  },
});
