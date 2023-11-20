import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

import { schema } from "./schemas";

export const db = drizzle(sql, { schema: schema });
