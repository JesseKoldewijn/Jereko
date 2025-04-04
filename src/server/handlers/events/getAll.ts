import { cache } from "react";

import { db } from "@/server/db/conn";

export const allEvents = cache(async () => {
  return (await db.query.events.findMany()).flat();
});
