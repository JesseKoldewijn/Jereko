import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).optional(),
});

const parsed = envSchema.safeParse({
  NODE_ENV: import.meta.env?.MODE ?? "development",
});

export const env = parsed.success
  ? parsed.data
  : { NODE_ENV: "development" as const };
