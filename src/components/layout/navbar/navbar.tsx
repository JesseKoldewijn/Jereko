"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import ThemeToggle from "@/components/ui/theme-toggle";
import { appConfig } from "@/config/app";
import { cn } from "@/lib/utils";
import { type Socials } from "@/server/db/schemas/socials";

import NavMenuMobile from "./mobile/navMenuMobile";
import NavbarMenu from "./navigationMenu";

const Navbar = ({ socials }: { socials: Socials | null }) => {
  const router = useRouter();

  const [scrollPositionStyle, setScrollPosition] =
    useState("relative mb-4 px-8");

  useEffect(() => {
    const setScrollPositionHandler = () => {
      const scrollTop = document.documentElement.scrollTop;
      setScrollPosition(
        cn(scrollTop > 15 ? "fixed top-0 px-8" : "relative mb-4 px-8"),
      );
    };

    setScrollPositionHandler();
    window.addEventListener("scroll", setScrollPositionHandler);
    window.addEventListener("loadstart", () => {
      console.log("loadstart");
    });
    return () => {
      window.removeEventListener("scroll", setScrollPositionHandler);
    };
  }, []);

  return (
    <nav
      className={cn(
        scrollPositionStyle,
        "max-w-auto z-50 flex w-full bg-[rgba(255,255,255,0.75)] py-4 dark:bg-[rgba(18,18,18,0.65)]",
      )}
    >
      <section className="my-auto mr-auto">
        <Link
          href="/"
          id="Jereko logo"
          className="flex font-semibold duration-500 hover:underline hover:underline-offset-4"
          onClick={() => {
            router.push("/");
          }}
        >
          {appConfig.branding.brandName}
        </Link>
      </section>
      <section className="my-auto flex flex-1 justify-center">
        <NavbarMenu />
      </section>
      <section className="my-auto ml-auto flex gap-4">
        <NavMenuMobile socials={socials} />
        <ThemeToggle />
      </section>
    </nav>
  );
};

export default Navbar;
