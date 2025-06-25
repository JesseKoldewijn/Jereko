import { socials } from "@/server/db/schemas/socials";

import { tableSeeder } from "../../utils";
import { initialSocials } from "./data";

export const seedSocialsTable = async () => {
  // This function is intended to seed the events table with initial data.
  // You can implement your seeding logic here.
  console.log("Seeding Socials table...");

  await tableSeeder({
    table: "socials",
    tableSchema: socials,
    data: initialSocials,
    identifyingKey: "label", // Assuming 'exp_key' is a unique identifier for experiences
  });

  console.log("Socials table seeded successfully.");
};
