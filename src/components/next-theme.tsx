"use client";

import { animate } from "motion";
import { ThemeProvider, useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const NextThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextThemeInner>{children}</NextThemeInner>
    </ThemeProvider>
  );
};

const NextThemeInner = ({ children }: { children: React.ReactNode }) => {
  const themeRef = useRef<HTMLDivElement>(null);

  const [lastTheme, setLastTheme] = useState<string>("system");

  const { theme } = useTheme();

  useEffect(() => {
    if (themeRef.current && lastTheme !== theme?.toString()) {
      const refElem = themeRef.current;

      if (
        (lastTheme === "system" && theme === "dark") ||
        (lastTheme === "dark" && theme === "system")
      ) {
        setLastTheme(() => theme?.toString() ?? "system");
        return;
      }

      animate(
        refElem,
        {
          opacity: [0, 1],
        },
        {
          duration: 1.2,
          easing: "ease-in-out",
        },
      );

      setLastTheme(() => theme?.toString() ?? "system");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return <div ref={themeRef}>{children}</div>;
};

export default NextThemeWrapper;
