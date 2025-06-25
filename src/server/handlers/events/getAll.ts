import { db } from "@/server/db/conn";

export const allEvents = async () => {
  return (await db.query.events.findMany()).flat();
};
