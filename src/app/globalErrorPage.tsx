"use client";

import * as Sentry from "@sentry/nextjs";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { useEffect } from "react";

import NextError from "next/error";

import { env } from "@/env";

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    const isLocalhost = window.location.hostname === "localhost";
    if (!isLocalhost) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html lang="en" className="" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#000" />
      </head>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}
        suppressHydrationWarning
      >
        <div className="fixed inset-0 flex max-h-screen flex-col items-center justify-center">
          <div className="pt-2">Environment: {env.NEXT_PUBLIC_NODE_ENV}</div>
          <NextError statusCode={500} title={error.message} />
          <button
            onClick={reset}
            className="fixed bottom-4 left-4 rounded-md border px-3 py-2"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
};
export default GlobalError;
