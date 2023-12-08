import { type StoryFn } from "@storybook/react";
import { ThemeProvider, useTheme } from "next-themes";

import ThemeToggle from "@/components/ui/theme-toggle";
import "@/styles/globals.css";

export const StorybookThemeWrapper = (Story: StoryFn) => {
  useTheme();

  return (
    <ThemeProvider
      defaultTheme="system"
      attribute="class"
      storageKey="themePreference"
    >
      <div className="relative inset-0 flex h-full w-full items-center justify-center bg-background text-foreground">
        <div className="absolute right-2 top-3">
          <ThemeToggle />
        </div>
        <div className="fixed inset-0 flex">
          <div className="m-auto">
            <Story />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};
