export const neo_namespaces = {
  posts: "Post:[Slug]",
};

/**
 * The function `neo_namespace_entry` takes a namespace and an entry ID as input and returns a string
 * combining the namespace and entry ID.
 * @param namespace - The `namespace` parameter is the key of the `neo_namespaces` object, which is
 * used to retrieve the corresponding namespace value.
 * @param {string} entryID - The `entryID` parameter is a string that represents the unique identifier
 * of an entry within a specific namespace.
 * @returns The function `neo_namespace_entry` takes in a `namespace` and an `entryID`, retrieves the
 * corresponding namespace value from the `neo_namespaces` object, and then returns a string
 * concatenating the namespace value with the `entryID`.
 */
export const neo_namespace_entry = (
  namespace: keyof typeof neo_namespaces,
  entryID: string,
) => {
  const neo_namespace = neo_namespaces[namespace];

  if (!neo_namespace) {
    throw new Error(`Namespace '${namespace}' not found in neo_namespaces`);
  }

  return `${neo_namespace}:${entryID}`;
};
