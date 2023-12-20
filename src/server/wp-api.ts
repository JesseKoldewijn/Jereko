import "server-only";

import { env } from "@/env.mjs";
import { type paths } from "@/types/wp-types";

const wpPrefix = "/wp/v2";
type wpPathRaw = keyof paths;
type wpPath = wpPathRaw extends `${typeof wpPrefix}${infer T}` ? T : never;

export type PostsParams = paths["/wp/v2/posts"]["get"]["parameters"]["query"];
export type PostParams =
  paths["/wp/v2/posts/{id}"]["get"]["parameters"]["path"];

export const fetchWP = async (
  path: wpPath,
  params: any = {},
  regInit?: RequestInit,
) => {
  const endpoint = `${env.WP_API_URL}${path}`;
  const basicAuth = btoa(`${env.WP_API_USER}:${env.WP_API_KEY}`);

  const paramsObjAsString = Object.entries(params).toString();
  const paramsString = new URLSearchParams(paramsObjAsString).toString();

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

  if (params && Object.keys(params).length > 0) {
    endpoint.concat(`?${paramsString}`);
  }

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
