"use client";

import { LuArrowUp } from "react-icons/lu";

import Link from "next/link";

import { LuGithub } from "@/icons/lu/Github";
import { LuLinkedin } from "@/icons/lu/LinkedIn";

import X from "@/components/icons/Twitter-X";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/config/app";
import { type Socials } from "@/server/db/schemas/socials";

const Footer = ({
  topSlot,
  innerSlot,
  socials,
}: {
  topSlot: React.ReactNode;
  innerSlot: React.ReactNode;
  socials: Socials | null;
}) => {
  const getYear = () => {
    const initialYear = 2023;

    return initialYear === new Date().getFullYear()
      ? initialYear
      : `${initialYear} - ${new Date().getFullYear()}`;
  };

  const getByPlatform = (platform: string) => {
    if (!socials) return null;
    return socials.find((social) => social.platform === platform);
  };

  const { twitter, linkedin, github } = {
    twitter: getByPlatform("twitter"),
    linkedin: getByPlatform("linkedin"),
    github: getByPlatform("github"),
  };

  return (
    <div className="mt-20">
      {topSlot}
      <footer className="mx-4 flex w-auto flex-col gap-10 rounded-t-2xl border-x border-t border-neutral-300 bg-neutral-100 px-4 py-10 dark:border-neutral-700 dark:bg-neutral-900 md:px-6 lg:mx-8 lg:gap-20 lg:py-16">
        {innerSlot}
        <div className="mx-5 flex flex-col items-center justify-center px-8 text-sm">
          <div className="mb-4 mt-4 flex gap-4">
            {twitter && (
              <Link
                aria-label="X (Twitter)"
                className="flex rounded-lg p-1 text-neutral-800 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                href={twitter.link ?? "#"}
                target="_blank"
                data-link-label={twitter.label ?? "twitter-link-footer"}
              >
                <X className="m-auto h-5 w-auto" />
                <span className="sr-only">Link to X (Twitter) profile</span>
              </Link>
            )}
            {github && (
              <Link
                aria-label="Instagram"
                className="rounded-lg p-1 text-neutral-800 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-400"
                href="https://github.com/JesseKoldewijn"
                target="_blank"
                data-link-label={github.label ?? "github-link-footer"}
              >
                <LuGithub className="h-6 w-auto" />
                <span className="sr-only">Link to Github profile</span>
              </Link>
            )}
            {linkedin && (
              <Link
                aria-label="LinkedIn"
                className="rounded-lg p-1 text-neutral-800 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-400"
                href="https://www.linkedin.com/in/jesse-koldewijn-5914531a3"
                target="_blank"
                data-link-label={linkedin.label ?? "linkedin-link-footer"}
              >
                <LuLinkedin className="h-6 w-auto" />
                <span className="sr-only">Link to LinkedIn profile</span>
              </Link>
            )}
          </div>
          <div className="mb-4 mt-3 flex gap-2">
            <span className="border-r-2 pr-2 text-neutral-800 dark:text-neutral-300">
              {getYear()}
            </span>
            <span className="font-semibold">
              {appConfig.branding.brandName}
            </span>
          </div>
          <Button
            className="rounded-lg px-2 py-1 text-neutral-800 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-400"
            variant="ghost"
            onClick={() =>
              typeof window && window.scrollTo({ top: 0, behavior: "smooth" })
            }
          >
            <LuArrowUp className="m-auto h-5 w-5" height={5} width={5} />
            <span className="sr-only">Back to top</span>
          </Button>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
