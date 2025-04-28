import type { StaticImageData } from "next/image";

import { use } from "react";

const buildDirectQueryUrl = (
  baseUrl: string,
  imageUrl: string,
  imageOptions?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: string;
  },
) => {
  const relativeUrlBase = "https://jereko.dev";

  const safeUrl = imageUrl.startsWith("/")
    ? `${relativeUrlBase}${imageUrl}`
    : imageUrl;

  const urlParts = new URL(safeUrl);
  const { protocol, host, pathname } = urlParts;
  const encodedUrl = encodeURIComponent(`${protocol}//${host}${pathname}`);

  const queryParams = new URLSearchParams();
  if (imageOptions) {
    if (imageOptions.width) {
      queryParams.append("width", imageOptions.width.toString());
    }
    if (imageOptions.height) {
      queryParams.append("height", imageOptions.height.toString());
    }
    if (imageOptions.quality) {
      queryParams.append("quality", imageOptions.quality.toString());
    }
    if (imageOptions.format) {
      queryParams.append("format", imageOptions.format);
    }
  }

  const queryString =
    queryParams.toString().length > 0 ? `&${queryParams.toString()}` : "";

  return `${baseUrl}/direct-query?dq-url=${encodedUrl}${queryString}`;
};

const buildIndirectQueryUrl = (
  baseUrl: string,
  imageUrl: string,
  imageOptions?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: string;
  },
) => {
  const relativeUrlBase = "https://jereko.dev";

  const safeUrl = imageUrl.startsWith("/")
    ? `${relativeUrlBase}${imageUrl}`
    : imageUrl;

  const urlParts = new URL(safeUrl);
  const { protocol, host, pathname } = urlParts;
  const encodedUrl = encodeURIComponent(`${protocol}//${host}${pathname}`);

  const queryParams = new URLSearchParams();
  if (imageOptions) {
    if (imageOptions.width) {
      queryParams.append("width", imageOptions.width.toString());
    }
    if (imageOptions.height) {
      queryParams.append("height", imageOptions.height.toString());
    }
    if (imageOptions.quality) {
      queryParams.append("quality", imageOptions.quality.toString());
    }
    if (imageOptions.format) {
      queryParams.append("format", imageOptions.format);
    }
  }

  const queryString =
    queryParams.toString().length > 0 ? `&${queryParams.toString()}` : "";

  return `${baseUrl}/indirect-query?iq-url=${encodedUrl}${queryString}`;
};

export const createOpenCdnUrl = ({
  imageUrl,
  queryType,
  imageOptions = {},
}: {
  imageUrl: string;
  queryType: "direct-query" | "indirect-query";
  imageOptions?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: string;
  };
}) => {
  const baseUrl = "https://cdn.jereko.dev";

  let queryUrl;

  switch (queryType) {
    case "direct-query":
      queryUrl = buildDirectQueryUrl(baseUrl, imageUrl, imageOptions);

      break;
    case "indirect-query":
      queryUrl = buildIndirectQueryUrl(baseUrl, imageUrl, imageOptions);

      break;
    default:
      throw new Error("Invalid query type");
  }

  return {
    src: queryUrl,
    toStaticImageAsset: () => {
      const object: StaticImageData = {
        src: queryUrl,
        width: imageOptions.width ?? 0,
        height: imageOptions.height ?? 0,
      };
      return object;
    },
  };
};
