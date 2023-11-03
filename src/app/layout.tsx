import { GeistMono, GeistSans } from "geist/font";
import { type Metadata } from "next";

import Navbar from "@/components/layout/navbar/navbar";
import NextThemeWrapper from "@/components/next-theme";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "JKinsight - My personal website | Jesse Koldewijn",
  description: "tbh idk what to put here yet",
  metadataBase: new URL(
    typeof process.env.VERCEL_URL !== "undefined" &&
    process.env.VERCEL_URL !== ""
      ? process.env.VERCEL_URL.includes("localhost")
        ? "http://localhost:3000"
        : "https://" + process.env.VERCEL_URL
      : "http://localhost:3000",
  ),
  icons: [
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <NextThemeWrapper>
          <Navbar />
          {children}
          <Toaster />
        </NextThemeWrapper>
      </body>
    </html>
  );
}
