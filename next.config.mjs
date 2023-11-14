import NextPWA from "next-pwa";

const prod = process.env.NODE_ENV === "production";

const withPWA = NextPWA({
  dest: "public",
  register: false,
  skipWaiting: true,
  disable: !prod,
});

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  compress: true,
  experimental: {
    ppr: true,
  },
};

/** @type {any} */
const nextConfigUntyped = config;

export default withPWA(nextConfigUntyped);
