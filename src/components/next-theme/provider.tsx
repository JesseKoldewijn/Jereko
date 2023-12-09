"use client";

import { ThemeProvider } from "next-themes";

import NextThemeHandler from "./handler";

const NextThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <NextThemeHandler>{children}</NextThemeHandler>
    </ThemeProvider>
  );
};

export default NextThemeWrapper;
