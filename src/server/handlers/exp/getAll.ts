import { cache } from "react";

import { db } from "@/server/db/conn";

export const allExperiences = cache(async () => {
  return (await db.query.Experiences.findMany()).flat();
});
