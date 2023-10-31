import { LocaleProvider } from "@/providers/LocaleProvider";
import "@/styles/globals.css";
import { matchedLang } from "@/utils/i18n";

import { GeistSans, GeistMono } from "geist/font";
import { cookies, headers } from "next/headers";

export const metadata = {
  title: "JKinsight - My personal website | Jesse Koldewijn",
  description: "tbh idk what to put here yet",
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
  const requestLang = headers().get("accept-language");
  const cookieLang = cookies().get("NEXT_LOCALE")?.value;

  const language = matchedLang(cookieLang ?? requestLang ?? "en-US");

  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <LocaleProvider defaultLang={language}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
