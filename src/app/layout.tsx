import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import dynamic from "next/dynamic";
import { cookies } from "next/headers";

import CommandMenuProvider from "@/components/command-menu";
import QuadSection from "@/components/layout/footer/quad-section";
import { usedTechnologies } from "@/config/tech";
import { base } from "@/lib/hostname";
import { getByPlatform } from "@/server/handlers/socials/getByPlatform";
import "@/styles/globals.css";

const Navbar = dynamic(() => import("@/components/layout/navbar/navbar"), {
  ssr: true,
});

const NextThemeWrapper = dynamic(
  () => import("@/components/next-theme/provider"),
  {
    ssr: true,
  },
);

const Toaster = dynamic(() => import("@/components/ui/toaster"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/layout/footer"), {
  ssr: true,
});

const TechUsedSection = dynamic(
  () => import("@/components/layout/footer/tech-used"),
  {
    ssr: false,
  },
);

export const metadata: Metadata = {
  title: "JKinsight - My personal website | Jesse Koldewijn",
  description: "tbh idk what to put here yet",
  metadataBase: new URL(base),
  icons: [
    {
      rel: "icon",
      sizes: "512x512",
      url: "/favicons/favicon-512x512.png",
    },
    {
      rel: "icon",
      sizes: "192x192",
      url: "/favicons/favicon-192x192.png",
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
    title: "JKinsight",
    description: "tbh idk what to put here yet",
    url: "https://jkinsight.vercel.app",
  },
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieJar = cookies();
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
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <NextThemeWrapper>
          <Navbar socials={socials} />
          <CommandMenuProvider>
            <div className="pb-8">{children}</div>
            <Toaster />
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
export default RootLayout;
