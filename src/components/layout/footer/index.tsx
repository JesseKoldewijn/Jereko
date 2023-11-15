"use client";

import { ArrowUp, Github, Linkedin, Twitter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { appConfig } from "@/config/app";

const Footer = () => {
  const getYear = () => {
    const initialYear = 2023;

    return initialYear === new Date().getFullYear()
      ? initialYear
      : `${initialYear} - ${new Date().getFullYear()}`;
  };

  return (
    <div className="mx-5 mb-5 flex flex-col items-center justify-center p-8 text-sm">
      <div className="mb-4 mt-4 flex gap-4">
        <a
          aria-label="Twitter"
          className="rounded-lg p-1 text-neutral-800 hover:bg-neutral-300 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-400"
          href="https://twitter.com/dull_joker"
        >
          <Twitter />
          <span className="sr-only">Link to Twitter profile</span>
        </a>
        <a
          aria-label="Instagram"
          className="rounded-lg p-1 text-neutral-800 hover:bg-neutral-300 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-400"
          href="https://github.com/JesseKoldewijn"
        >
          <Github />
          <span className="sr-only">Link to Github profile</span>
        </a>
        <a
          aria-label="LinkedIn"
          className="rounded-lg p-1 text-neutral-800 hover:bg-neutral-300 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-400"
          href="https://www.linkedin.com/in/jesse-koldewijn-5914531a3"
        >
          <Linkedin />
          <span className="sr-only">Link to LinkedIn profile</span>
        </a>
      </div>
      <div className="mb-4 mt-3 flex gap-2">
        <span className="border-r-2 pr-2 text-neutral-800 dark:text-neutral-300">
          {getYear()}
        </span>
        <span className="font-semibold">{appConfig.branding.brandName}</span>
      </div>
      <Button
        className="rounded-lg px-2 py-1 text-neutral-800 hover:bg-neutral-300 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-400"
        variant="ghost"
        onClick={() =>
          typeof window && window.scrollTo({ top: 0, behavior: "smooth" })
        }
      >
        <ArrowUp className="m-auto h-5 w-5" height={5} width={5} />
        <span className="sr-only">Back to top</span>
      </Button>
    </div>
  );
};
export default Footer;
