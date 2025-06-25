import { events } from "@/server/db/schemas/events";

import { tableSeeder } from "../../utils";
import { initialEvents } from "./data";

export const seedEventsTable = async () => {
  // This function is intended to seed the events table with initial data.
  // You can implement your seeding logic here.
  console.log("Seeding events table...");

  await tableSeeder({
    table: "events",
    tableSchema: events,
    data: initialEvents,
    identifyingKey: "name", // Assuming 'name' is a unique identifier for events
  });

  console.log("Events table seeded successfully.");
};
