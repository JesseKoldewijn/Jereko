import { drizzle as drizzleMySql } from "drizzle-orm/mysql2";
import sql2 from "mysql2";

import { env } from "@/env";

import { schema } from "./schemas";

const sql2_url = `mysql://${env.MYSQL_DB_USER}:${env.MYSQL_DB_PASSWORD}@${env.MYSQL_DB_HOST}:3306/${env.MYSQL_DB_DATABASE}?ssl={"rejectUnauthorized":true}`;
const sql2_connector = sql2.createConnection(sql2_url);

export const db = drizzleMySql(sql2_connector, {
  mode: "default",
  schema,
});
