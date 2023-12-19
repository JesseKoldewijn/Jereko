import "server-only";

import { env } from "@/env.mjs";

import { type paths } from "./wp-types";

const wpPrefix = "/wp/v2";
type wpPathRaw = keyof paths;
type wpPath = wpPathRaw extends `${typeof wpPrefix}${infer T}` ? T : never;

export const fetchWP = async (path: wpPath, regInit?: RequestInit) => {
  const endpoint = `${env.WP_API_URL}${path}`;
  const basicAuth = btoa(`${env.WP_API_USER}:${env.WP_API_KEY}`);

  const {
    method,
    headers,
    body = undefined,
    ...rest
  } = regInit ?? {
    method: undefined,
    headers: {},
    body: undefined,
  };

  const requestInit = {
    method: method ?? "GET",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Basic " + basicAuth,
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

    return (await res.json()) as any[];
  } catch (error) {
    console.error(error);
    return null;
  }
};
