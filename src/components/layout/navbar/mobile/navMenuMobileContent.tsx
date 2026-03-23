"use client";

import { useTheme } from "next-themes";

import React from "react";

import AppIcons from "@/icons/custom/app-icons-collection";
import { LuList } from "@/icons/lu/List";

import { appConfig } from "@/config/app";
import type { Socials } from "@/data/socials";
import { cn } from "@/lib/utils";

import { listedEntry, showcaseEntry } from "../navigationMenu";

const NavMenuMobileContent = ({ socials }: { socials: Socials | null }) => {
  const { theme } = useTheme();

  return (
    <div
      key={`nav-menu-${theme ?? "default"}`}
      className={cn(
        "opacity-1 fixed bottom-0 left-0 right-0 top-[4.5rem] flex bg-neutral-100 !bg-opacity-70 transition-opacity duration-1000 dark:bg-neutral-950 dark:!bg-opacity-80",
      )}
    >
      <div
        key={`overlay-${theme ?? "default"}`}
        className={cn(
          "absolute inset-0 bottom-0 left-0 right-0 top-0 h-full w-auto bg-neutral-100 bg-opacity-80 blur-xl dark:bg-neutral-950",
        )}
      ></div>
      <div
        key={`nav-menu-inner-${theme ?? "default"}`}
        className={cn(
          "relative mx-0 my-auto mb-auto mt-2 flex max-h-[calc(100vh-4rem)] w-full flex-col items-center gap-4 overflow-y-auto px-4 pb-8 pt-6",
        )}
      >
        <strong>General Pages</strong>
        {listedEntry.links.flatMap((entry) => {
          const pathName =
            entry.href.split("/")[1] !== "" ? entry.href.split("/")[1] : "home";

          const Icon =
            Object.entries(AppIcons.internal).find(
              (icon) => icon[0] === pathName,
            )?.[1] ?? LuList;

          return (
            <a
              href={entry.href}
              key={entry.title}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-foreground p-2"
            >
              <Icon className="h5" />
              {entry.title}
            </a>
          );
        })}
        <a
          href={appConfig.repo.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-foreground p-2"
        >
          <AppIcons.socials.github className="h-5" />
          OpenSource
        </a>
        <strong>About Me</strong>
        {showcaseEntry.links.flatMap((entry) => {
          const pathName =
            entry.href.split("/")[2] !== "" ? entry.href.split("/")[2] : "root";

          const Icon =
            Object.entries(AppIcons.aboutMe).find(
              (icon) => icon[0] === pathName,
            )?.[1] ?? LuList;

          return (
            <a
              href={entry.href}
              key={entry.title}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-foreground p-2"
            >
              <Icon className="h-5" />
              {entry.title}
            </a>
          );
        })}
        {socials && (
          <>
            <strong>Socials</strong>
            {socials.flatMap((social, idx) => {
              const Icon =
                Object.entries(AppIcons.socials).find(
                  (icon) => icon[0] === social.platform,
                )?.[1] ?? LuList;

              return (
                <a
                  href={social.link ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={social.label ?? `social-${idx}`}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-foreground p-2"
                >
                  <Icon className="h-5" />
                  {social.label}
                </a>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default NavMenuMobileContent;
