import { env } from "../env.mjs";

export const typegenWP = async (/** @type {string} */ pathRoot) => {
  const openApiTS = (await import("openapi-typescript")).default;
  const schemaUrl = `${String(env.WP_API_URL).replace(
    "/wp-json/wp/v2",
    "/rest-api/schema",
  )}`;

  const schemaUrlObj = new URL(schemaUrl);

  console.log("Fetching schema from", schemaUrlObj.href);

  const schema = await openApiTS(schemaUrlObj);
  const writePath = `${pathRoot ? pathRoot : "."}/wp-types.ts`;
  const fs = await import("fs");

  console.log("Writing schema to", writePath);

  fs.writeFileSync(writePath, schema);
};
