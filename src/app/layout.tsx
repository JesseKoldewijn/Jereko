import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import dynamic from "next/dynamic";

import CommandMenuProvider from "@/components/command-menu";
import Footer from "@/components/layout/footer/footer";
import { base } from "@/lib/hostname";
import "@/styles/globals.css";

const Navbar = dynamic(() => import("@/components/layout/navbar/navbar"), {
  ssr: true,
});

const NextThemeWrapper = dynamic(() => import("@/components/next-theme"), {
  ssr: true,
});

const NextPwaWrapper = dynamic(() => import("@/components/next-pwa"), {
  ssr: false,
});

const Toaster = dynamic(() => import("@/components/ui/toaster"), {
  ssr: false,
});

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#000" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <NextPwaWrapper isProd={process.env.NODE_ENV == "production"}>
          <NextThemeWrapper>
            <Navbar />
            <CommandMenuProvider>
              <div className="pb-8">{children}</div>
              <Toaster />
              <Footer />
            </CommandMenuProvider>
          </NextThemeWrapper>
        </NextPwaWrapper>
      </body>
    </html>
  );
}
