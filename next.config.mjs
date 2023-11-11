/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  compress: true,
  experimental: {
    webVitalsAttribution: ["FCP", "LCP", "CLS", "FID", "TTFB", "INP"],
  },
  
};

export default config;
