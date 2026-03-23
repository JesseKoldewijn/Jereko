import { getViteConfig } from "astro/config";

// Astro's getViteConfig UserConfig type doesn't include Vitest's 'test' - known upstream gap
export default getViteConfig({
  // @ts-expect-error - Vitest extends Vite config with 'test'
  test: {
    include: ["src/**/*.{test,spec}.{ts,tsx}", "e2e/**/*.{test,spec}.{ts,tsx}"],
    environment: "node",
  },
});
