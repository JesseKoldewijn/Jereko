"use client";

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

const pageHeadings = {
  "/": {
    title: "About Me",
    description: "Who am I? And what do I do?",
  },
  "/hobbies": {
    title: "Hobbies",
    description: "What do I do in my free time?",
  },
  "/volunteering": {
    title: "Volunteering",
    description: "About my volunteering experience. So what do I do?",
  },
};

const getRelativePath = (path: string) => {
  const pathName = path.replace("/about-me", "");
  if (pathName == "") return "/";
  return pathName;
};

const AboutMeContent = () => {
  const pathName = usePathname();

  const heroContents =
    pageHeadings[getRelativePath(pathName) as keyof typeof pageHeadings];

  return (
    <>
      <HeroSection
        bannerImage={{
          dark: Avatar,
          light: Avatar,
        }}
        bannerContent={
          heroContents ?? {
            title: "About Me - (placeholder)",
            description: "Who am I? And what do I do?",
          }
        }
      />
      <div
        id="about-me-navigation"
        className="flex flex-col items-center justify-center gap-4 px-4 pb-8 xs:flex-row xs:gap-8 xs:px-0"
      >
        <Link
          href="/about-me"
          className={cn(
            pathName == "/about-me"
              ? "bg-neutral-100 text-neutral-900 sm:dark:hover:border-neutral-200 sm:dark:hover:bg-transparent sm:dark:hover:text-neutral-200"
              : "sm:hover:bg-neutral-100 sm:hover:text-neutral-900",
            "w-full rounded-lg border border-neutral-200 px-3 py-2 text-center xs:w-auto sm:hover:bg-neutral-100 sm:hover:text-neutral-900",
          )}
        >
          About Me
        </Link>
        <Link
          href="/about-me/hobbies"
          className={cn(
            pathName == "/about-me/hobbies"
              ? "bg-neutral-100 text-neutral-900 sm:dark:hover:border-neutral-200 sm:dark:hover:bg-transparent sm:dark:hover:text-neutral-200"
              : "sm:hover:bg-neutral-100 sm:hover:text-neutral-900",
            "w-full rounded-lg border border-neutral-200 px-3 py-2 text-center xs:w-auto sm:hover:bg-neutral-100 sm:hover:text-neutral-900",
          )}
        >
          Hobbies
        </Link>
        <Link
          href="/about-me/volunteering"
          className={cn(
            pathName == "/about-me/volunteering"
              ? "bg-neutral-100 text-neutral-900 sm:dark:hover:border-neutral-200 sm:dark:hover:bg-transparent sm:dark:hover:text-neutral-200"
              : "sm:hover:bg-neutral-100 sm:hover:text-neutral-900",
            "w-full rounded-lg border border-neutral-200 px-3 py-2 text-center xs:w-auto sm:hover:bg-neutral-100 sm:hover:text-neutral-900",
          )}
        >
          Volunteering
        </Link>
      </div>
    </>
  );
};

export default AboutMeContent;
