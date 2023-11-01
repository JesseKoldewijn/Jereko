"use client";

import { LucideOctagon } from "lucide-react";
import React, { useEffect, useState } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";

import { ThemeToggle } from "../ui/theme-toggle";

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const getScrollPositionStyle = () => {
    return scrollPosition > 1
      ? "fixed left-4 right-4 top-0 px-6"
      : "relative px-8 mb-4";
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollPosition(document.documentElement.scrollTop);
    });

    return () => {
      window.removeEventListener("scroll", () => {
        setScrollPosition(document.documentElement.scrollTop);
      });
    };
  }, []);

  return (
    <div className={cn(getScrollPositionStyle(), "flex w-full py-4")}>
      <Link href="#" aria-label="JKinsight logo" className="flex font-semibold">
        <LucideOctagon className="my-auto" />
        <span className="sr-only">JKinsight</span>
      </Link>
      <section className="ml-auto">
        <ThemeToggle />
      </section>
    </div>
  );
};

export default Navbar;
