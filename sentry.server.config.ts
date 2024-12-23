// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from "@sentry/nextjs";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

if (process.env.NODE_ENV !== "development") {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1,

    // Profiling sample rate is relative to tracesSampleRate
    profilesSampleRate: 1.0,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    // This is an optional setting that allows you to sample traces by a given percentage.
    integrations: [
      // Add profiling integration to list of integrations
      nodeProfilingIntegration(),
    ],
  });
}
