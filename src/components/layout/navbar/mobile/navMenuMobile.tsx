"use client";

import { X as CloseIcon, List, MenuIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import AppIcons from "@/components/icons/AppIcons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type Socials } from "@/server/db/schemas/socials";

import { listedEntry, showcaseEntry } from "../navigationMenu";

const NavMenuMobile = ({ socials }: { socials: Socials | null }) => {
  const pathName = usePathname();
  const { theme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    menuRef.current!.style.userSelect = "auto";
    menuRef.current!.style.cursor = "auto";
    menuRef.current!.style.opacity = "1";
    setShowMenu(true);
  };

  const closeMenu = () => {
    menuRef.current!.style.userSelect = "none";
    menuRef.current!.style.cursor = "default";
    menuRef.current!.style.opacity = "0";
    setTimeout(() => {
      setShowMenu(false);
    }, 700);
  };

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showMenu]);

  useEffect(() => {
    closeMenu();
  }, [pathName]);

  return (
    <div className="flex max-w-full flex-col items-center justify-center md:hidden">
      <Button
        className="rounded-lg border p-2"
        onClick={() => {
          if (showMenu) {
            closeMenu();
          } else {
            openMenu();
          }
        }}
      >
        {showMenu ? <CloseIcon /> : <MenuIcon />}
        <span className="sr-only">Open mobile navigation menu</span>
      </Button>
      <div
        ref={menuRef}
        className="transition-all duration-1000"
        style={{
          opacity: 0,
          userSelect: "none",
          cursor: "default",
        }}
      >
        {showMenu && (
          <div
            key={`nav-menu-${theme ?? "default"}`}
            className={cn(
              "opacity-1 fixed bottom-0 left-0 right-0 top-[4.5rem] flex bg-neutral-300 !bg-opacity-70 transition-opacity duration-1000 dark:bg-neutral-950",
            )}
          >
            <div
              key={`overlay-${theme ?? "default"}`}
              className={cn(
                "absolute inset-0 bottom-0 left-0 right-0 top-0 h-full w-auto bg-neutral-300 bg-opacity-80 blur-3xl dark:bg-neutral-950",
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
                  entry.href.split("/")[1] !== ""
                    ? entry.href.split("/")[1]
                    : "home";

                const Icon =
                  Object.entries(AppIcons.internal).find(
                    (icon) => icon[0] === pathName,
                  )?.[1] ?? List;

                return (
                  <Link
                    href={entry.href}
                    key={entry.title}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border p-2"
                  >
                    <Icon className="h5" />
                    {entry.title}
                  </Link>
                );
              })}
              <Link
                href="https://github.com/JesseKoldewijn/JKinsight"
                className="flex w-full items-center justify-center gap-2 rounded-lg border p-2"
              >
                <AppIcons.socials.github className="h-5" />
                OpenSource
              </Link>
              <strong>About Me</strong>
              {showcaseEntry.links.flatMap((entry) => {
                const pathName =
                  entry.href.split("/")[2] !== ""
                    ? entry.href.split("/")[2]
                    : "root";

                const Icon =
                  Object.entries(AppIcons.aboutMe).find(
                    (icon) => icon[0] === pathName,
                  )?.[1] ?? List;

                return (
                  <Link
                    href={entry.href}
                    key={entry.title}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border p-2"
                  >
                    <Icon className="h-5" />
                    {entry.title}
                  </Link>
                );
              })}
              {socials && (
                <>
                  <strong>Socials</strong>
                  {socials.flatMap((social, idx) => {
                    const Icon =
                      Object.entries(AppIcons.socials).find(
                        (icon) => icon[0] === social.platform,
                      )?.[1] ?? List;

                    return (
                      <Link
                        href={social.link ?? "#"}
                        key={social.label ?? `social-${idx}`}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border p-2"
                      >
                        <Icon className="h-5" />
                        {social.label}
                      </Link>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavMenuMobile;
