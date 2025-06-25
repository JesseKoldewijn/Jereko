import { eq } from "drizzle-orm";

import { db } from "../conn";

type dbQuery = typeof db.query;
type dbTable = keyof dbQuery;

interface TableData {
  table: dbTable;
  tableSchema: any; // The schema of the table to be seeded, typically a Drizzle schema
  data: any[];
  identifyingKey?: string; // Optional key to identify unique records
}

export const tableSeeder = async ({
  table,
  tableSchema,
  data,
  identifyingKey,
}: TableData) => {
  // This function is intended to seed a specific table with initial data.
  // You can implement your seeding logic here.
  console.log(`Seeding ${table} table...`);

  const dbTable = db.query[table];

  if (!dbTable) {
    throw new Error(`Table ${table} does not exist in the database.`);
  }

  // @ts-expect-error
  const getExistingData = await dbTable.findMany();

  // Check if the table is already seeded
  if (getExistingData.length > 0) {
    // filter out the initial data to avoid duplicates
    const existingDataNames = (getExistingData
      .map((item: { [x: string]: any }) => item[identifyingKey ?? "name"])
      .filter(Boolean) ?? []) as string[];
    const newData = data.filter((item) => {
      if (!item[identifyingKey ?? "name"]) return false; // Skip items without a name
      return !existingDataNames.includes(item[identifyingKey ?? "name"]);
    });

    if (newData.length > 0) {
      console.log(
        `Adding ${newData.length} new items to the ${table} table...`,
      );

      // using Drizzle ORM to insert new data into the specified table
      await db.insert(tableSchema).values(newData);

      console.log(`${table} New items added successfully.`);
    } else {
      console.log(`${table} table already seeded with initial data.`);
    }

    console.log(`Updating existing items in the ${table} table...`);

    // Update the existing data if needed
    const skippedData = data.filter((item) => {
      if (!item[identifyingKey ?? "name"]) return false; // Skip items without a name
      return existingDataNames.includes(item[identifyingKey ?? "name"]);
    });

    if (skippedData.length === 0) {
      console.log("No existing items to update.");
      return;
    }

    console.log(
      `Updating ${skippedData.length} existing items in the ${table} table...`,
    );

    // using Drizzle ORM to insert initial data into the specified table
    for (const item of data) {
      const existingItem = getExistingData.find(
        (existing: { [x: string]: any }) =>
          existing[identifyingKey ?? "name"] === item[identifyingKey ?? "name"],
      );
      if (existingItem) {
        // Update the existing item with the new data
        await db
          .delete(tableSchema)
          .where(
            eq(
              tableSchema[identifyingKey ?? "name"],
              item[identifyingKey ?? "name"],
            ),
          )
          .execute();
        await db.insert(tableSchema).values(item);
      }
    }

    console.log("Existing items updated successfully.");

    return;
  }

  console.log(`${table} table is empty, seeding with initial data...`);

  // using Drizzle ORM to insert initial data into the specified table
  await db.insert(tableSchema).values(data);

  console.log(`${table} table seeded successfully.`);
};
