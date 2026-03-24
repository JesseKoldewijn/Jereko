"use client";

import { ThemeProvider } from "next-themes";

import CommandMenuProvider from "@/components/ui/command-menu";
import { type Socials } from "@/data/socials";
import HeaderContextProvider from "@/providers/HeaderProvider";

import Navbar from "./navbar/navbar";

export default function AppWrapper({ socials }: { socials: Socials | null }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
    >
      <HeaderContextProvider>
        <CommandMenuProvider>
          <Navbar socials={socials} />
        </CommandMenuProvider>
      </HeaderContextProvider>
    </ThemeProvider>
  );
}
