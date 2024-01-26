import { ImageResponse } from "next/og";

import { base } from "@/utils/hostname";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "My personal website - by Jesse Koldewijn";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  // Font
  const geistVariableFontFetch = await fetch(
    new URL(`${base}/fonts/geist-sans/Geist-Regular.woff2`),
  );
  const fontData = await geistVariableFontFetch.arrayBuffer();

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 85,
          backgroundImage:
            "linear-gradient(to left bottom, #303030, #101010, #303030)",
          color: "#f8f8f8",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          gap: 0,
        }}
      >
        <h1
          style={{
            backgroundImage:
              "linear-gradient(to left bottom, #f87171, #9333ea, #93c5fd)",
            backgroundClip: "text",
            color: "transparent",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            marginTop: 0,
            marginBottom: 0,
          }}
        >
          Jereko
        </h1>
        <h2
          style={{
            color: "#fff",
            textShadow: "0 0 5px #f8f8f8b5",
            marginTop: 0,
            marginBottom: 0,
            fontSize: 75,
          }}
        >
          My Personal Website
        </h2>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Geist Regular",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
