import withLitSSRInit from "@lit-labs/nextjs/index";
import { withSentryConfig } from "@sentry/nextjs";
import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";
import { sentryRootConfig } from "sentry.root.config";

import type NextBundleAnalyzer from "@next/bundle-analyzer";

import { serwistInitConfig } from "@/config/pwa/server";

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
      "@lit-labs/ssr-react",
      "@lit-labs/nextjs",
      "@lit/react",
    ],
    esmExternals: true,
  },
  transpilePackages: [
    "@sentry/nextjs",
    "@sentry/profiling-node",
    "@serwist/next",
    "@justeattakeaway/pie-webc",
    "@justeattakeaway/pie-icons-webc",
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
  const litSsrConfig = withLitSSRInit({
    addDeclarativeShadowDomPolyfill: false,
  }) as (config: NextConfig) => NextConfig;

  return withSerwist(litSsrConfig(config));
};
export default config;
