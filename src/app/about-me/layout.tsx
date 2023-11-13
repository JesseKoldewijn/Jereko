"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const AboutMeLayout = ({ children }: LayoutProps) => {
  const pathname = usePathname();

  const [linkActiveStatus, setLinkActiveStatus] = useState({
    "/about-me/intro": pathname == "/about-me/intro" ? true : false,
    "/about-me/hobbies": pathname == "/about-me/hobbies" ? true : false,
    "/about-me/volunteering":
      pathname == "/about-me/volunteering" ? true : false,
  });

  useEffect(() => {
    setLinkActiveStatus({
      "/about-me/intro":
        window.location.pathname == "/about-me/intro" ? true : false,
      "/about-me/hobbies":
        window.location.pathname == "/about-me/hobbies" ? true : false,
      "/about-me/volunteering":
        window.location.pathname == "/about-me/volunteering" ? true : false,
    });
  }, [pathname]);

  return (
    <>
      <div className="flex items-center justify-center gap-8 pb-8">
        <Link
          href="/about-me/intro"
          className={cn(
            linkActiveStatus["/about-me/intro"]
              ? "bg-neutral-200 text-neutral-900 sm:dark:hover:border-neutral-200 sm:dark:hover:bg-transparent sm:dark:hover:text-neutral-200"
              : "sm:hover:bg-neutral-200 sm:hover:text-neutral-900",
            "rounded-lg border border-neutral-200 px-3 py-2 sm:hover:bg-neutral-200 sm:hover:text-neutral-900",
          )}
        >
          Introduction
        </Link>

        <Link
          href="/about-me/hobbies"
          className={cn(
            linkActiveStatus["/about-me/hobbies"]
              ? "bg-neutral-200 text-neutral-900 sm:dark:hover:border-neutral-200 sm:dark:hover:bg-transparent sm:dark:hover:text-neutral-200"
              : "sm:hover:bg-neutral-200 sm:hover:text-neutral-900",
            "rounded-lg border border-neutral-200 px-3 py-2 sm:hover:bg-neutral-200 sm:hover:text-neutral-900",
          )}
        >
          Hobbies
        </Link>

        <Link
          href="/about-me/volunteering"
          className={cn(
            linkActiveStatus["/about-me/volunteering"]
              ? "bg-neutral-200 text-neutral-900 sm:dark:hover:border-neutral-200 sm:dark:hover:bg-transparent sm:dark:hover:text-neutral-200"
              : "sm:hover:bg-neutral-200 sm:hover:text-neutral-900",
            "rounded-lg border border-neutral-200 px-3 py-2 sm:hover:bg-neutral-200 sm:hover:text-neutral-900",
          )}
        >
          Volunteering
        </Link>
      </div>
      <div className="flex items-center justify-center p-4 align-middle">
        {children}
      </div>
    </>
  );
};

export default AboutMeLayout;
