"use client";

import { navigate as viewTransitionNavigate } from "astro:transitions/client";
import { useEffect, useState } from "react";

import { X } from "@/icons/custom/Twitter-X";
import { LuGithub } from "@/icons/lu/Github";
import { LuHome } from "@/icons/lu/Home";
import { LuLinkedin } from "@/icons/lu/LinkedIn";
import { LuList } from "@/icons/lu/List";
import { LuListChecks } from "@/icons/lu/ListChecks";
import { LuUser } from "@/icons/lu/User";

import { appConfig } from "@/config/app";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./command-menu-imports";

const navigate = (path: string) => {
  void viewTransitionNavigate(path).catch(() => {
    window.location.assign(path);
  });
};

const CommandMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  const down = (e: KeyboardEvent) => {
    if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setOpen((open) => !open);
    }

    if (open) {
      const keyMatch = (key: string) => {
        if (e.key === key && (e.metaKey || e.ctrlKey)) {
          return e.key;
        }
      };

      switch (keyMatch(e.key)) {
        case "h": {
          e.preventDefault();
          navigate("/");
          setOpen(false);
          break;
        }
        case "m": {
          e.preventDefault();
          navigate("/about-me");
          setOpen(false);
          break;
        }
        case "p": {
          e.preventDefault();
          navigate("/projects");
          setOpen(false);
          break;
        }
        case "e": {
          e.preventDefault();
          navigate("/experience");
          setOpen(false);
          break;
        }
        case "o": {
          window.open(appConfig.repo.href, "_blank");
          setOpen(false);
          break;
        }
        case "x": {
          window.open(appConfig.socials.twitter.href, "_blank");
          setOpen(false);
          break;
        }
        case "g": {
          window.open(appConfig.socials.github.href, "_blank");
          setOpen(false);
          break;
        }
        case "l": {
          window.open(appConfig.socials.linkedIn.href, "_blank");
          setOpen(false);
          break;
        }
        default:
          break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem
              onSelect={() => {
                navigate("/");
                setOpen(false);
              }}
            >
              <LuHome className="mr-2 h-4 w-4" />
              <span>Home page</span>
              <CommandShortcut>⌘H</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                navigate("/about-me");
                setOpen(false);
              }}
            >
              <LuUser className="mr-2 h-4 w-4" />
              <span>About Me</span>
              <CommandShortcut>⌘M</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                navigate("/projects");
                setOpen(false);
              }}
            >
              <LuList className="mr-2 h-4 w-4" />
              <span>My Projects</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                navigate("/experience");
                setOpen(false);
              }}
            >
              <LuListChecks className="mr-2 h-4 w-4" />
              <span>My Experience</span>
              <CommandShortcut>⌘E</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                window.open(appConfig.repo.href, "_blank");
                setOpen(false);
              }}
            >
              <LuListChecks className="mr-2 h-4 w-4" />
              <span>OpenSource</span>
              <CommandShortcut>⌘O</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Socials">
            <CommandItem
              onSelect={() => {
                window.open(appConfig.socials.twitter.href, "_blank");
                setOpen(false);
              }}
            >
              <X className="ml-[.15rem] mr-2 !h-4 !w-4" />
              <span>X/Twitter</span>
              <CommandShortcut>⌘X</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                window.open(appConfig.socials.github.href, "_blank");
                setOpen(false);
              }}
            >
              <LuGithub className="mr-2 h-4 w-4" />
              <span>Github</span>
              <CommandShortcut>⌘G</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                window.open(appConfig.socials.linkedIn.href, "_blank");
                setOpen(false);
              }}
            >
              <LuLinkedin className="mr-2 h-4 w-4" />
              <span>LinkedIn</span>
              <CommandShortcut>⌘L</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      {children}
    </>
  );
};

export default CommandMenuProvider;
