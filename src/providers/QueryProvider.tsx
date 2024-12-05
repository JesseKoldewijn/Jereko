"use client";

import { useSearchParams } from "next/navigation";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { scan } from "react-scan";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const isEnabled =
      window.location.search.includes("rc=true") ||
      searchParams.toString().includes("rc=true");

    if (!isEnabled) return;

    scan({
      enabled: true,
      log: true, // logs render info to console (default: false)
    });
  }, [searchParams]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
