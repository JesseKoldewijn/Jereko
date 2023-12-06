import { cache } from "react";

import { db } from "@/server/db/conn";
import { Experiences } from "@/server/db/schemas/experience";

export const allExperiences = cache(async () => {
  return (await db.select().from(Experiences)).flat();
});
