import { cache } from "react";

import { db } from "@/server/db/conn";
import { Projects } from "@/server/db/schemas/projects";

export const allProjects = cache(async () => {
  return (await db.select().from(Projects)).flat();
});
