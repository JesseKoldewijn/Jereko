"use client";

import { type ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

import { useLayoutEffect } from "react";
import { scan } from "react-scan";

import { env } from "@/env";

const INTERNAL_ReactScanLoader = () => {
  const searchParams = useSearchParams();

  const getEnabledStatus = (searchParam: ReadonlyURLSearchParams) =>
    searchParam.get("react-scan") == "true";

  useLayoutEffect(() => {
    const enabled = getEnabledStatus(searchParams);
    if (!enabled) return;
    scan({
      enabled: true,
      log: true, // logs render info to console (default: false)
    });
  }, [searchParams]);

  return null;
};

const ReactScanLoader =
  env.NEXT_PUBLIC_NODE_ENV == "development"
    ? INTERNAL_ReactScanLoader
    : () => null;

export default ReactScanLoader;
