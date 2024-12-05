"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

import { type ComponentType, useLayoutEffect, useState } from "react";

const DummyComponent: ComponentType<{}> = () => null;

export const ReactScanLoader = () => {
  const searchParams = useSearchParams();
  const [enabled, setEnabled] = useState(false);

  useLayoutEffect(() => {
    const reactScanParam = searchParams.get("react-scan");
    const isEnabled = reactScanParam == "true";
    console.log(
      "reactScan is currently %s",
      isEnabled ? "enabled" : "disabled",
    );
    setEnabled(isEnabled);
  }, [searchParams]);

  const ReactScanLoaderComponent = enabled
    ? dynamic(() => import("@/utils/react-scan"), {
        ssr: false,
      })
    : DummyComponent;

  return <ReactScanLoaderComponent />;
};
