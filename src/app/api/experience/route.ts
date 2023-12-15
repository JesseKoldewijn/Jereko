import { NextResponse } from "next/server";

import { allExperiences } from "@/server/handlers/exp/getAll";

export const GET = async () => {
  const projects = await allExperiences();
  return NextResponse.json(projects);
};
