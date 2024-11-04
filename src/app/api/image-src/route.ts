import { buildImage } from "./file-builder";

const validateInt = (value: string | null, defaultValue: number): number => {
  const parsedValue = parseInt(value ?? "");
  const isNan = isNaN(parsedValue);

  return isNan ? defaultValue : parsedValue;
};

export const GET = async (req: Request) => {
  const reqUrl = new URL(decodeURIComponent(req.url));
  const imageSrc = reqUrl.searchParams.get("url");
  const width = validateInt(reqUrl.searchParams.get("width"), 750);
  const height = validateInt(reqUrl.searchParams.get("height"), 100);
  const quality = validateInt(reqUrl.searchParams.get("quality"), 100);

  if (!imageSrc) {
    return new Response("Missing url parameter", { status: 400 });
  }

  const response = await fetch(imageSrc);

  if (!response.ok) {
    const responseError = await response.text();

    return new Response(
      JSON.stringify({
        message: "Failed to fetch image",
        url: imageSrc,
        error: responseError,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const responseIsImage =
    response.headers.get("Content-Type")?.startsWith("image/") ?? false;

  if (!responseIsImage) {
    return new Response("Not an image", { status: 400 });
  }

  const arrayBuffer = await response.arrayBuffer();

  const img = await buildImage(arrayBuffer, {
    width,
    height,
    quality,
  });

  return new Response(img.stream, {
    headers: {
      "Content-Type": "image/webp",
    },
  });
};
