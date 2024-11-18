import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import dynamic from "next/dynamic";
import { cookies } from "next/headers";

import { usedTechnologies } from "@/config/tech";
import { env } from "@/env";
import { type Social } from "@/server/db/schemas/socials";
import { getByPlatform } from "@/server/handlers/socials/getByPlatform";
import "@/styles/globals.css";
import { base } from "@/utils/hostname";

const Navbar = dynamic(() => import("@/components/layout/navbar/navbar"));

const NextThemeWrapper = dynamic(
  () => import("@/components/next-theme/provider"),
);

const Footer = dynamic(() => import("@/components/layout/footer"));

const QuadSection = dynamic(
  () => import("@/components/layout/footer/quad-section"),
);

const TechUsedSectionNew = dynamic(
  () => import("@/components/layout/footer/tech-used"),
);

const CommandMenuProvider = dynamic(
  () => import("@/components/ui/command-menu"),
);

const QueryProvider = dynamic(() => import("@/providers/QueryProvider"), {
  ssr: true,
});

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieJar = await cookies();
  const cookieJarTheme = cookieJar.get("theme");

  const socials = await getByPlatform("twitter", "github", "linkedin");

  return (
    <html
      lang="en"
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
            <Navbar socials={socials} />
            <CommandMenuProvider>
              <PageContent innerChildren={children} socials={socials} />
            </CommandMenuProvider>
          </NextThemeWrapper>
          {env.NODE_ENV !== "development" && <SpeedInsights />}
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;

const PageContent = ({
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
};

export const metadata: Metadata = {
  title: {
    absolute: "Jereko - My personal website | Jesse Koldewijn",
    template: "%s | Jereko - My personal website | Jesse Koldewijn",
  },
  description:
    "Jereko - My personal website | build and developed by Jesse Koldewijn",
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
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Jereko",
    description: "tbh idk what to put here yet",
    url: "https://jereko.dev",
  },
};
