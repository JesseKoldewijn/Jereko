import type { Config } from "drizzle-kit";

import { env } from "./src/env";

const sql2_url = `mysql://${env.MYSQL_DB_USER}:${env.MYSQL_DB_PASSWORD}@${env.MYSQL_DB_HOST}:3306/${env.MYSQL_DB_DATABASE}`;

const config = {
  schema: "./src/server/db/schemas/*.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    connectionString: sql2_url,
  },
} satisfies Config;

export default config;
