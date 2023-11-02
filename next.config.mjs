/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  compress: true,

  images: {
    remotePatterns: [
      {
        hostname: "flowbite.s3.amazonaws.com",
        protocol: "https",
      },
    ],
  },
};

export default config;
