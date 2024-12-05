import { unstable_cache } from "next/cache";

import { db } from "@/server/db/conn";

export const allEvents = unstable_cache(async () => {
  try {
    return await (await db.query.events.findMany()).flat();
  } catch (error) {
    console.error(error);
    return [];
  }
});
