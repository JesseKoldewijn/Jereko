"use client";

import * as Sentry from "@sentry/nextjs";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import Error, { ErrorProps } from "next/error";

import { usedTechnologies } from "@/config/tech";
import { Social } from "@/server/db/schemas/socials";

const CommandMenuProvider = dynamic(
  () => import("@/components/ui/command-menu"),
  {
    ssr: true,
  },
);

const NextThemeWrapper = dynamic(
  () => import("@/components/next-theme/provider"),
  {
    ssr: true,
  },
);

const Navbar = dynamic(() => import("@/components/layout/navbar/navbar"), {
  ssr: true,
});

const Footer = dynamic(() => import("@/components/layout/footer"), {
  ssr: true,
});

const QuadSection = dynamic(
  () => import("@/components/layout/footer/quad-section"),
  {
    ssr: true,
  },
);

const TechUsedSection = dynamic(
  () => import("@/components/layout/footer/tech-used"),
  {
    ssr: true,
  },
);

const GlobalError = ({ error }: { error: ErrorProps }) => {
  const [socials, setSocials] = useState<Social[] | null>(null);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const getPageProps = async () => {
      const res = await fetch("/api/page-props", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status !== 200) {
        throw new Error({
          statusCode: 500,
          title: "Failed to fetch page props in global errorpage",
        });
      }
      const json = await res.json();
      const { socials, cookies } = json as {
        socials: Social[];
        cookies: {
          theme: "light" | "dark" | "system";
        };
      };

      setTheme(cookies.theme);
      setSocials(socials);
    };
    getPageProps();
  }, []);

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en" className={`${theme ?? "theme"}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#000" />
      </head>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}
        suppressHydrationWarning
      >
        <NextThemeWrapper>
          <Navbar socials={socials} />
          <CommandMenuProvider>
            <div className="pb-8">
              <Error statusCode={error.statusCode} />
            </div>
            <Footer
              topSlot={<TechUsedSection techUsed={usedTechnologies} />}
              innerSlot={<QuadSection />}
              socials={socials}
            />
          </CommandMenuProvider>
        </NextThemeWrapper>
      </body>
    </html>
  );
};
export default GlobalError;
