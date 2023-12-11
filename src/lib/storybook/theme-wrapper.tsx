import { type StoryFn } from "@storybook/react";
import { ThemeProvider, useTheme } from "next-themes";

import GeistMono from "@/fonts/geist-mono/GeistMono-Variable.woff2";
import GeistSans from "@/fonts/geist-sans/Geist-Variable.woff2";
import "@/styles/globals.css";

const FontLoader = () => {
  return (
    <>
      <link rel="prefetch" href={GeistSans} as="font" crossOrigin="anonymous" />
      <link rel="prefetch" href={GeistMono} as="font" crossOrigin="anonymous" />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: 'Geist';
              font-display: swap;
              src: url(${GeistSans}) format('woff2-variations');
            }
            @font-face {
              font-family: 'Geist Mono';
              font-display: swap;
              src: url(${GeistMono}) format('woff2-variations');
            }
            :root {
              --font-sans: 'Geist', Roboto, "Helvetica Neue", sans-serif;
              --font-mono: 'Geist Mono', monospace;

              font-family: var(--font-sans)!important;
            }
          `,
        }}
      ></style>
    </>
  );
};

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
