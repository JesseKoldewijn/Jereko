import { type StoryFn } from "@storybook/react";
import { ThemeProvider, useTheme } from "next-themes";

import "@/styles/globals.css";

export const StorybookThemeWrapper = (theme?: "light" | "dark" | "system") => {
  const s = (Story: StoryFn) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTheme();

    return (
      <ThemeProvider
        defaultTheme={theme ?? "system"}
        attribute="class"
        storageKey="themePreference"
      >
        <div className="relative inset-0 flex h-full w-full items-center justify-center bg-background text-foreground">
          <div className="fixed inset-0 flex">
            <div className="m-auto">
              <Story />
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  };

  return s;
};
