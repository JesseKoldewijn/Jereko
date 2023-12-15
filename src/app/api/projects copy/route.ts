import { NextResponse } from "next/server";

import { allProjects } from "@/server/handlers/projects/getAll";

export const GET = async () => {
  const projects = await allProjects();
  return NextResponse.json(projects);
};
