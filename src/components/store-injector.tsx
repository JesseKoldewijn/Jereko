"use client";

import { useEffect } from "react";

import { validateStoreExpiration } from "@/store/local-store";

export const StoreInjector = ({
  namespace,
  data,
}: {
  namespace: string;
  data: any;
}) => {
  useEffect(() => {
    validateStoreExpiration(namespace, data);
  }, [namespace, data]);

  return null;
};
