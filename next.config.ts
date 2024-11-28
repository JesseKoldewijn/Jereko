import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import { sentryRootConfig } from "sentry.root.config";

import BundleAnalyzer from "@next/bundle-analyzer";

import "./src/env";

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live/_next-live;
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
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: "img.youtube.com", protocol: "https" }],
  },
  compress: true,
  reactProductionProfiling: false,
  poweredByHeader: false,
  experimental: {
    reactCompiler: true,
    optimizePackageImports: ["@sentry/nextjs", "@sentry/profiling-node"],
  },
  transpilePackages: ["@sentry/nextjs", "@sentry/profiling-node"],
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

let config: NextConfig;

if (isAnalyze) {
  const withBundleAnalyzer = BundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
    analyzerMode: "static",
  });

  config = withSentryConfig(withBundleAnalyzer(nextConfig), sentryRootConfig);
} else {
  config = withSentryConfig(nextConfig, sentryRootConfig);
}

export default config;
