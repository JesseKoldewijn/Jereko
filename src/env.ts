import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    MYSQL_DB_HOST: z.string().min(1),
    MYSQL_DB_USER: z.string().min(1),
    MYSQL_DB_PASSWORD: z.string().min(1),
    MYSQL_DB_DATABASE: z.string().min(1),
    VERCEL_URL: z.string().optional(),
    NODE_ENV: z.enum(["development", "production", "test"]),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_NODE_ENV: z.string().optional(),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   * ---
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   * ---
   */
  // runtimeEnv: process.env,
  experimental__runtimeEnv: {
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
  },
  skipValidation: process.env.SKIP_ENV_VALIDATION !== undefined,
});
