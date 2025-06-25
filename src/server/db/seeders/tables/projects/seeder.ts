import { projects } from "@/server/db/schemas/projects";

import { tableSeeder } from "../../utils";
import { initialProjects } from "./data";

export const seedProjectsTable = async () => {
  // This function is intended to seed the events table with initial data.
  // You can implement your seeding logic here.
  console.log("Seeding Projects table...");

  await tableSeeder({
    table: "projects",
    tableSchema: projects,
    data: initialProjects,
    identifyingKey: "title", // Assuming 'exp_key' is a unique identifier for experiences
  });

  console.log("Projects table seeded successfully.");
};
