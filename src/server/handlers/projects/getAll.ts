import { cache } from "react";

import { db } from "@/server/db/conn";

export const allProjects = cache(async () => {
  try {
    return (await db.query.projects.findMany()).flat();
  } catch (error) {
    console.error(error);
    return [];
  }
});
