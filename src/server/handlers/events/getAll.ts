import { cache } from "react";

import { db } from "@/server/db/conn";
import { Events } from "@/server/db/schemas/events";

export const allEvents = cache(async () => {
  return (await db.select().from(Events)).flat();
});
