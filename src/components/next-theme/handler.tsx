"use client";

import cookies from "js-cookie";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";

const NextThemeHandler = ({ children }: { children: React.ReactNode }) => {
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const cookieTheme = cookies.get("theme");

    if (theme !== cookieTheme) {
      cookies.set("theme", theme ?? systemTheme ?? "dark");
    }
  }, [systemTheme, theme]);

  return <>{children}</>;
};

export default NextThemeHandler;
