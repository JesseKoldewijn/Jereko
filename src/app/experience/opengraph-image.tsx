import { ImageResponse } from "next/og";

import bgImage from "@/images/og-bg.png";
import { base } from "@/lib/hostname";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  // Font
  const geistVariableFontFetch = await fetch(
    new URL(`${base}/fonts/Geist-Regular.otf`),
  );
  const fontData = await geistVariableFontFetch.arrayBuffer();

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 85,
          backgroundImage: `url(${base + bgImage.src})`,
          backgroundPosition: "center",
          backgroundSize: "1200px 630px",
          backgroundRepeat: "no-repeat",
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
            marginTop: 0,
            marginBottom: 0,
            textShadow: "0 0 15px #000000",
          }}
        >
          JKinsight
        </h1>
        <h2
          style={{
            color: "#141414",
            textShadow: "0 0 5px #f8f8f8b5",
            marginTop: 0,
            marginBottom: 0,
            fontSize: 75,
          }}
        >
          Experience
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
