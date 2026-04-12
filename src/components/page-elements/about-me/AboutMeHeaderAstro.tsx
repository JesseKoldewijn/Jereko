"use client";

import { type BannerImage } from "@/components/layout/sections/HeroSection";
import HeroSection from "@/components/layout/sections/HeroSection";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/about-me", label: "About Me" },
  { href: "/about-me/hobbies", label: "Hobbies" },
  { href: "/about-me/volunteering", label: "Volunteering" },
] as const;

export default function AboutMeHeader({
  pathname,
  bannerImage,
  title,
  description,
}: {
  pathname: string;
  bannerImage: { dark: BannerImage; light: BannerImage };
  title: string;
  description: string;
}) {
  return (
    <>
      <HeroSection
        bannerImage={bannerImage}
        bannerContent={{ title, description }}
      />
      <div
        id="about-me-navigation"
        className="xs:flex-row xs:gap-8 xs:px-0 flex flex-col items-center justify-center gap-4 px-4 pb-8"
      >
        {navItems.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className={cn(
              pathname === href
                ? "bg-neutral-100 text-neutral-900 sm:dark:hover:border-neutral-200 sm:dark:hover:bg-transparent sm:dark:hover:text-neutral-200"
                : "sm:hover:bg-neutral-100 sm:hover:text-neutral-900",
              "xs:w-auto w-full rounded-lg border border-neutral-200 px-3 py-2 text-center sm:hover:bg-neutral-100 sm:hover:text-neutral-900",
            )}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  );
}
