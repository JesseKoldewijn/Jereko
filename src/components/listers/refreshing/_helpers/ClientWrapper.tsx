"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ClientWrapperProps = { children: React.ReactNode };

const queryClient = new QueryClient();

export const ClientWrapper = ({ children }: ClientWrapperProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
