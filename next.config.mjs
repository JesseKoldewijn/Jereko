import NextPWA from "@ducanh2912/next-pwa";

const prod = process.env.NODE_ENV === "production";
const analyze =
  process.env.ANALYZE !== undefined && process.env.ANALYZE !== "false";

const withPWA = NextPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: !prod,
  workboxOptions: {
    disableDevLogs: true,
  },
});

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  compress: true,
  images: {
    remotePatterns: [
      { hostname: "img.youtube.com", protocol: "https" },
      {
        hostname: "via.placeholder.com",
        protocol: "https",
      },
    ],
  },
  transpilePackages: ["lucide-react"], // add this
  experimental: {
    ppr: true,
  },
};

export default withPWA(config);
