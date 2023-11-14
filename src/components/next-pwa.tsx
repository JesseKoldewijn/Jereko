"use client";

import { useEffect } from "react";

interface NextPwaWrapper {
  children: React.ReactNode;
}

const NextPwaWrapper = ({ children }: NextPwaWrapper) => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js", { scope: "/" });
    }
  }, []);

  return <>{children}</>;
};

export default NextPwaWrapper;
