import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import dynamic from "next/dynamic";
import { cookies, headers } from "next/headers";

import { memo } from "react";

import Footer from "@/components/layout/footer";
import { usedTechnologies } from "@/config/tech";
import { env } from "@/env";
import { type Social } from "@/server/db/schemas/socials";
import { getByPlatform } from "@/server/handlers/socials/getByPlatform";
import RegisterPWA from "@/service-worker/register-worker";
import "@/styles/globals.css";
import { getAgeByDateString } from "@/utils/age";
import { base } from "@/utils/hostname";
import { deepEqual } from "@/utils/object";

import { TechUsedSectionNew } from "./layout_footer";

const QuadSection = dynamic(
  () => import("@/components/layout/footer/quad-section"),
  {
    // requires SSR
    ssr: true,
  },
);

const Navbar = dynamic(() => import("@/components/layout/navbar/navbar"), {
  ssr: true,
});

const NextThemeWrapper = dynamic(
  () => import("@/components/next-theme/provider"),
  {
    ssr: true,
  },
);

const CommandMenuProvider = dynamic(
  () => import("@/components/ui/command-menu"),
  {
    ssr: true,
  },
);

const HeaderContextProvider = dynamic(
  () => import("@/providers/HeaderProvider"),
  {
    ssr: true,
  },
);

const QueryProvider = dynamic(() => import("@/providers/QueryProvider"), {
  ssr: true,
});

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieJar = await cookies();
  const headersList = await headers();
  const requestedUrl = headersList.get("x-url") ?? base;
  const searchParams = new URL(requestedUrl).searchParams;

  const cookieJarTheme = cookieJar.get("theme");

  const socials = await getByPlatform("twitter", "github", "linkedin");

  const swEnabled =
    env.NODE_ENV == "production" || searchParams.get("sw") == "true";

  return (
    <html
      lang="en"
      dir="ltr"
      className={cookieJarTheme ? cookieJarTheme.value : ""}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#000" />
      </head>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}
        suppressHydrationWarning
      >
        <QueryProvider>
          <NextThemeWrapper>
            <HeaderContextProvider>
              <Navbar socials={socials} />
              <CommandMenuProvider>
                <PageContent innerChildren={children} socials={socials} />
                {swEnabled && <RegisterPWA />}
              </CommandMenuProvider>
            </HeaderContextProvider>
          </NextThemeWrapper>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;

const PageContent = memo(
  ({
    innerChildren,
    socials,
  }: {
    innerChildren: React.ReactNode;
    socials: Social[] | null;
  }) => {
    return (
      <>
        <main className="min-h-[90svh] pb-8">{innerChildren}</main>
        <Footer
          topSlot={<TechUsedSectionNew techUsed={usedTechnologies} />}
          innerSlot={<QuadSection />}
          socials={socials}
        />
      </>
    );
  },
  (prev, next) => {
    const prevChildrenMatch = deepEqual(prev.innerChildren, next.innerChildren);
    const prevSocialsMatch = deepEqual(prev.socials, next.socials);
    return prevChildrenMatch && prevSocialsMatch;
  },
);
PageContent.displayName = "PageContent";

export const generateMetadata = async () => {
  const myAge = getAgeByDateString(new Date(1999, 2, 15));
  const pageDesc = `Jereko | build and developed by Jesse Koldewijn, a ${myAge} y/o tech freak, software engineering fanatic and gamer.`;

  const md: Metadata = {
    title: {
      absolute: "Jereko - My personal website | Jesse Koldewijn",
      template: "%s | Jereko - My personal website | Jesse Koldewijn",
    },
    description: pageDesc,
    metadataBase: new URL(base),
    icons: [
      {
        rel: "icon",
        sizes: "512x512",
        url: "/favicons/android-chrome-512x512.png",
      },
      {
        rel: "icon",
        sizes: "192x192",
        url: "/favicons/android-chrome-192x192.png",
      },
      {
        rel: "apple-touch-icon",
        url: "/favicons/apple-touch-icon.png",
        sizes: "180x180",
      },
      {
        rel: "icon",
        sizes: "32x32",
        url: "/favicons/favicon-32x32.png",
      },
      {
        rel: "icon",
        sizes: "16x16",
        url: "/favicons/favicon-16x16.png",
      },
      {
        rel: "icon",
        url: "/favicons/favicon.ico",
      },
    ],
    openGraph: {
      title: "Jereko",
      description: pageDesc,
      url: "https://jereko.dev",
    },
  };
  return md;
};
