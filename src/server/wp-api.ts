import "server-only";

import { env } from "@/env.mjs";

export const fetchWP = async <T>(path: string, regInit: RequestInit) => {
  const endpoint = `${env.WP_API_URL}${path}`;

  const { method, headers, body, ...rest } = regInit;

  const requestInit = {
    method: method ?? "GET",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body) ?? undefined,
    ...rest,
  };

  try {
    const res = await fetch(endpoint, requestInit);

    if (!res.ok) {
      console.error(`Error fetching ${endpoint}`, res);
      return null;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error(error);
    return null;
  }
};
