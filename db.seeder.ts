import { seedDatabase } from "./src/server/db/seeders/seeder";

const runSeeder = async () => {
  try {
    console.log("Starting database seeder...");
    await seedDatabase();
    console.log("Database seeding completed successfully.");
  } catch (error) {
    console.error("Error during database seeding:", error);
  }
};

runSeeder()
  .then(() => {
    console.log("Seeding process finished.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding process failed:", error);
    process.exit(1);
  });
