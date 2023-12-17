import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    WP_API_URL: z.string().url(),
    WP_API_USER: z.string(),
    WP_API_KEY: z.string(),
    POSTGRES_URL: z.string().url(),
    VERCEL_URL: z.string().url(),
    NODE_ENV: z.string().optional(),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {},
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    WP_API_URL: process.env.WP_API_URL,
    WP_API_USER: process.env.WP_API_USER,
    WP_API_KEY: process.env.WP_API_KEY,
    POSTGRES_URL: process.env.POSTGRES_URL,
    VERCEL_URL: process.env.VERCEL_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
  skipValidation: process.env.SKIP_ENV_VALIDATION !== undefined,
});
