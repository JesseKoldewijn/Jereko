import { experiences } from "@/server/db/schemas/experience";

import { tableSeeder } from "../../utils";
import { initialExperiences } from "./data";

export const seedExperiencesTable = async () => {
  // This function is intended to seed the events table with initial data.
  // You can implement your seeding logic here.
  console.log("Seeding Experiences table...");

  await tableSeeder({
    table: "experiences",
    tableSchema: experiences,
    data: initialExperiences,
    identifyingKey: "exp_key", // Assuming 'exp_key' is a unique identifier for experiences
  });

  console.log("Experiences table seeded successfully.");
};
