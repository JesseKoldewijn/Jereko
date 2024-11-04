// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import {
  browserProfilingIntegration,
  browserTracingIntegration,
  init,
  replayIntegration,
} from "@sentry/nextjs";

if (process.env.NODE_ENV !== "development") {
  init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1.0,

    // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
    tracePropagationTargets: ["localhost", /^https:\/\/jereko\.dev/],

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    // This is an optional setting that allows you to sample traces by a given percentage.
    replaysOnErrorSampleRate: 1.0,

    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,

    // This enables automatic instrumentation on the client. Currently only
    profilesSampleRate: 1.0,

    // You can remove this option if you're not planning to use the Sentry Session Replay feature:
    integrations: [
      replayIntegration({
        // Additional Replay configuration goes in here, for example:
        maskAllText: false,
        blockAllMedia: true,
      }),
      browserTracingIntegration(),
      browserProfilingIntegration(),
    ],

    // This function will be called for every sampled span
    // to determine if it should be profiled
    profilesSampler: (_samplingContext) => {
      return 0.25;
    },
  });
}
