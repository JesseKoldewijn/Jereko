import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import dynamic from "next/dynamic";
import { cookies } from "next/headers";

import Footer from "@/components/layout/footer";
import { usedTechnologies } from "@/config/tech";
import { type Social } from "@/server/db/schemas/socials";
import { getByPlatform } from "@/server/handlers/socials/getByPlatform";
import "@/styles/globals.css";
import { base } from "@/utils/hostname";

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
  openGraph: {
    title: "Jereko",
    description: "tbh idk what to put here yet",
    url: "https://jereko.dev",
  },
};
