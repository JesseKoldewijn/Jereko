import { seedEventsTable } from "./tables/events/seeder";
import { seedExperiencesTable } from "./tables/experiences/seeder";
import { seedProjectsTable } from "./tables/projects/seeder";
import { seedSocialsTable } from "./tables/socials/seeder";

export const seedDatabase = async () => {
  // This function is intended to seed the database with initial data.
  // You can implement your seeding logic here.
  console.log("Seeding database...");

  // Example: Insert initial data into the database
  // await db.collection('events').insertMany(initialEvents);
  await seedEventsTable();
  await seedExperiencesTable();
  await seedProjectsTable();
  await seedSocialsTable();

  console.log("Database seeded successfully.");
};
