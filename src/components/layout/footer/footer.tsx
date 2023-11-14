"use client";

import { ArrowUp, Instagram, Linkedin, Twitter } from "lucide-react";

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
          className="text-neutral-800 hover:bg-neutral-400 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-400"
          href="#"
        >
          <Twitter />
        </a>
        <a
          aria-label="Instagram"
          className="text-neutral-800 hover:bg-neutral-400 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-400"
          href="#"
        >
          <Instagram />
        </a>
        <a
          aria-label="LinkedIn"
          className="text-neutral-800 hover:bg-neutral-400 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-400"
          href="#"
        >
          <Linkedin />
        </a>
      </div>
      <div className="mb-4 mt-3 flex gap-2">
        <span className="border-r-2 pr-2 text-neutral-800 hover:bg-neutral-400 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-400">
          {getYear()}
        </span>
        <span>{appConfig.branding.brandName}</span>
      </div>
      <Button
        className="flex text-neutral-800 hover:bg-neutral-400 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-400"
        variant="ghost"
        onClick={() =>
          typeof window && window.scrollTo({ top: 0, behavior: "smooth" })
        }
      >
        <ArrowUp className="m-auto h-5 w-5" height={5} width={5} />
      </Button>
    </div>
  );
};
export default Footer;
