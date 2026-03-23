import { registerSW } from "virtual:pwa-register";

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    registerSW({ immediate: true });
  }, []);
  return null;
}
