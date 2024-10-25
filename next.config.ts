import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

import BundleAnalyzer from "@next/bundle-analyzer";

import "./src/env";
import "./src/utils/react19-log-drop";

type CacheLife = {
  [profile: string]: {
    stale?: number;
    revalidate?: number;
    expire?: number;
  };
};

const cacheLife: CacheLife = {
  default: {
    stale: 60,
    revalidate: 60,
    expire: 120,
  },
};

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: "img.youtube.com", protocol: "https" }],
  },
  compress: true,
  reactProductionProfiling: false,
  experimental: {
    reactCompiler: true,
    cacheLife,
  },
  transpilePackages: ["react-icons", "ckeditor5", "@ckeditor/ckeditor5-react"],
};

const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  analyzerMode: "static",
});

export default withSentryConfig(
  withBundleAnalyzer(config),
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "hardwarehulp",
    project: "jereko",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  },
);
