import dotEnv from "dotenv";
import type { Config } from "drizzle-kit";

dotEnv.config();

const config = {
  schema: "./src/server/db/schemas/*.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
    ssl: true,
  },
} satisfies Config;

export default config;
