import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

import NextError from "next/error";

const GlobalError = ({ error }: { error: Error & { digest?: string } }) => {
  useEffect(() => {
    const isLocalhost = window.location.hostname === "localhost";
    if (!isLocalhost) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <div className="flex min-w-full max-w-sm">
      <NextError statusCode={500} title={error.message} />
    </div>
  );
};
export default GlobalError;
