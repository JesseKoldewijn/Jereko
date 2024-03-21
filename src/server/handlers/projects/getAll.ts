import { cache } from "react";

import { db } from "@/server/db/conn";

export const allProjects = cache(async () => {
  return (await db.query.Projects.findMany()).flat();
});
