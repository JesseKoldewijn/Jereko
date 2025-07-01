import { withSentryConfig } from "@sentry/nextjs";
import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";
import { sentryRootConfig } from "sentry.root.config";

import type NextBundleAnalyzer from "@next/bundle-analyzer";

import { serwistInitConfig } from "@/config/pwa/server";

import "./src/env";

const withLitSSR = require("@lit-labs/nextjs")();

const cspHeader = `
  default-src 'self' https://vercel.live https://cdn.jereko.dev https://www.youtube.com;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://cdn.jereko.dev https://www.youtube.com;
  style-src 'self' 'unsafe-inline';
  worker-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:;
  img-src 'self' blob: data: https://cdn.jereko.dev https://www.youtube.com;
  font-src 'self';
  object-src 'self' https://cdn.jereko.dev https://www.youtube.com;
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "img.youtube.com", protocol: "https" },
      {
        hostname: "cdn.jereko.dev",
        protocol: "https",
      },
    ],
  },
  compress: true,
  reactProductionProfiling: false,
  poweredByHeader: false,
  experimental: {
    reactCompiler: true,
    optimizePackageImports: [
      "@sentry/nextjs",
      "@sentry/profiling-node",
      "@serwist/next",
    ],
    esmExternals: true,
  },
  transpilePackages: [
    "@sentry/nextjs",
    "@sentry/profiling-node",
    "@serwist/next",
  ],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};

const isAnalyze = process.env.ANALYZE === "true";

const config = async () => {
  let config: NextConfig;

  if (isAnalyze) {
    const BundleAnalyzer: typeof NextBundleAnalyzer = (
      await import("@next/bundle-analyzer")
    ).default;

    const withBundleAnalyzer = BundleAnalyzer({
      enabled: process.env.ANALYZE === "true",
      analyzerMode: "static",
    });

    config = withSentryConfig(withBundleAnalyzer(nextConfig), sentryRootConfig);
  } else {
    config = withSentryConfig(nextConfig, sentryRootConfig);
  }

  const withSerwist = withSerwistInit(serwistInitConfig);

  const pwaConf = withSerwist(config);
  const withLit = withLitSSR(pwaConf);

  return {
    ...withLit,
    images: nextConfig.images,
  };
};
export default config;
