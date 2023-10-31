import "@/styles/globals.css";

import { GeistSans, GeistMono } from "geist/font";

export const metadata = {
  title: "JKinsight - My personal website | Jesse Koldewijn",
  description: "tbh idk what to put here yet",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
