"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import ThemeToggle from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

import NavbarMenu from "./navigationMenu";

const Navbar = () => {
  const [scrollPositionStyle, setScrollPosition] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollTop = document.documentElement.scrollTop;
      setScrollPosition(
        scrollTop > 1
          ? "fixed left-4 right-4 top-0 px-6"
          : "relative px-8 mb-4",
      );
    });

    return () => {
      window.removeEventListener("scroll", () => {
        const scrollTop = document.documentElement.scrollTop;
        setScrollPosition(
          scrollTop > 1
            ? "fixed left-4 right-4 top-0 px-6"
            : "relative px-8 mb-4",
        );
      });
    };
  }, []);

  return (
    <nav className={cn(scrollPositionStyle, "flex w-full px-6 py-4")}>
      <section className="my-auto mr-auto">
        <Link
          href="/"
          aria-label="JKinsight logo"
          className="flex font-semibold duration-500 hover:underline hover:underline-offset-4"
        >
          JKinsight
        </Link>
      </section>
      <section className="my-auto flex flex-1 justify-center">
        <NavbarMenu />
      </section>
      <section className="my-auto ml-auto">
        <ThemeToggle />
      </section>
    </nav>
  );
};

export default Navbar;
