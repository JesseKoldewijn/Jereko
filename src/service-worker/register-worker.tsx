"use client";

import { useEffect } from "react";
import type { Serwist } from "serwist";

declare global {
  interface Window {
    serwist: {
      register: () => Promise<Serwist | undefined>;
    };
  }
}

export default function RegisterPWA() {
  useEffect(() => {
    if ("serviceWorker" in navigator && window.serwist !== undefined) {
      window.serwist.register();
    }
  }, []);
  return <></>;
}
