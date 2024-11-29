import { withSentryConfig } from "@sentry/nextjs";
import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";
import { sentryRootConfig } from "sentry.root.config";

import type NextBundleAnalyzer from "@next/bundle-analyzer";

import "./src/env";

const cspHeader = `
    default-src 'self' https://vercel.live;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live;
    style-src 'self' 'unsafe-inline';
    worker-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:;
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

const nextConfig: NextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: "img.youtube.com", protocol: "https" }],
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

  const withSerwist = withSerwistInit({
    cacheOnNavigation: true,
    swSrc: "src/app/app-worker.ts",
    swDest: "public/app-worker.js",
    swUrl: "/app-worker.js",
    reloadOnOnline: true,
    disable: process.env.NODE_ENV !== "production",
  });

  return withSerwist(config);
};
export default config;
