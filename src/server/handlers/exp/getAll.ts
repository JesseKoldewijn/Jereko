import { cache } from "react";

import { db } from "@/server/db/conn";

export const allExperiences = cache(async () => {
  try {
    return (await db.query.experiences.findMany()).flat();
  } catch (error) {
    console.error(error);
    return [];
  }
});
