import type { Config } from "drizzle-kit";

import { env } from "./src/env.mjs";

const config = {
  schema: "./src/server/db/schemas/*.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: env.POSTGRES_URL + "?sslmode=require",
    ssl: true,
  },
} satisfies Config;

export default config;
