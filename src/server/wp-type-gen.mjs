import { env } from "../env.mjs";

export const typegenWP = async (/** @type {string} */ pathRoot) => {
  const openApiTS = (await import("openapi-typescript")).default;
  const schemaUrl = `${String(env.WP_API_URL).replace(
    "/wp-json/wp/v2",
    "/rest-api/schema",
  )}`;

  const schemaUrlObj = new URL(schemaUrl);

  console.log("Fetching schema from", schemaUrlObj);
  const schemaFetch = await fetch(schemaUrlObj, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!schemaFetch.ok) {
    console.error(`Error fetching ${schemaUrl}`, schemaFetch);
    return null;
  }

  const schemaJson = await schemaFetch.json();
  const schemaJsonString = JSON.stringify(schemaJson);

  const schema = await openApiTS(schemaJsonString);
  const writePath = `${pathRoot ? pathRoot : "."}/wp-types.ts`;
  const fs = await import("fs");

  fs.writeFileSync(writePath, schema);
};
