import { type StoryFn } from "@storybook/react";
import FontLoader from "./fontLoader";
import { ThemeProvider, useTheme } from "next-themes";

import "@/styles/globals.css";

export const StorybookThemeWrapper = (theme?: "light" | "dark" | "system") => {
  const s = (Story: StoryFn) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTheme();

    return (
      <div className={`font-sans`}>
        <FontLoader />
        <ThemeProvider
          attribute="class"
          defaultTheme={theme ?? "dark"}
          disableTransitionOnChange
        >
          <div className="relative inset-0 flex h-full w-full items-center justify-center bg-background  text-foreground">
            <div className="fixed inset-0 flex">
              <div className="m-auto">
                <Story />
              </div>
            </div>
          </div>
        </ThemeProvider>
      </div>
    );
  };

  return s;
};
