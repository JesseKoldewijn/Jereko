import React from "react";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Avatar from "@/images/avatar.webp";
import { cn } from "@/lib/utils";

const HeroSection = dynamic(
  () => import("@/components/layout/sections/HeroSection"),
  {
    ssr: true,
  },
);

const Hobbies = () => {
  const pathName = usePathname();

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <HeroSection
        bannerImage={{
          dark: Avatar,
          light: Avatar,
        }}
        bannerContent={{
          title: "About Me",
          description: "Who am I? And what do I do?",
        }}
      />
      <div className="flex items-center justify-center gap-8 pb-8">
        <Link
          href="/about-me/intro"
          className={cn(
            pathName == "/about-me/intro"
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
            pathName == "/about-me/hobbies"
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
            pathName == "/about-me/volunteering"
              ? "bg-neutral-200 text-neutral-900 sm:dark:hover:border-neutral-200 sm:dark:hover:bg-transparent sm:dark:hover:text-neutral-200"
              : "sm:hover:bg-neutral-200 sm:hover:text-neutral-900",
            "rounded-lg border border-neutral-200 px-3 py-2 sm:hover:bg-neutral-200 sm:hover:text-neutral-900",
          )}
        >
          Volunteering
        </Link>
      </div>
    </div>
  );
};

export default Hobbies;
