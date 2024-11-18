"use client";

import {
  createContext,
  memo,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { LuList, LuListChecks, LuUser } from "react-icons/lu";

import { usePathname, useRouter } from "next/navigation";

import { LuGithub } from "@/icons/lu/Github";
import { LuLinkedin } from "@/icons/lu/LinkedIn";

import X from "@/components/icons/Twitter-X";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./command";

const CommandMenuContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>(null!);

const dummyWindow = {
  navigator: {
    userAgent: "unknown",
  },
  window: {
    innerWidth: 0,
    innerHeight: 0,
  },
} as Window & typeof globalThis;

export const CommandMenuOpenButton = (
  props: Omit<React.HTMLAttributes<HTMLParagraphElement>, "children">,
) => {
  const pathName = usePathname();

  const [windowSize, setWindowSize] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const getDeviceType = () => {
    const userAgent = window.navigator.userAgent;
    const mobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      );
    setIsDesktop(!mobile);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize((x) => {
        if (x !== window.innerWidth) {
          return window.innerWidth;
        }
        return x;
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useLayoutEffect(() => {
    getDeviceType();
  }, [pathName, windowSize]);

  return (
    isDesktop && (
      <p {...props}>
        <span className="pointer-events-none inline-flex select-none items-center gap-1">
          Press
        </span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p>
    )
  );
};

const CommandMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
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
          router.push("/");
          setOpen(false);
          break;
        }
        case "m": {
          e.preventDefault();
          router.push("/about-me");
          setOpen(false);
          break;
        }
        case "p": {
          e.preventDefault();
          router.push("/projects");
          setOpen(false);
          break;
        }
        case "e": {
          e.preventDefault();
          router.push("/experience");
          setOpen(false);
          break;
        }
        case "b": {
          e.preventDefault();
          router.push("/blog");
          setOpen(false);
          break;
        }
        case "o": {
          window.open("https://github.com/JesseKoldewijn/Jereko", "_blank");
          setOpen(false);
          break;
        }
        case "x": {
          window.open("https://x.com/dull_joker", "_blank");
          setOpen(false);
          break;
        }
        case "g": {
          window.open("https://github.com/JesseKoldewijn", "_blank");
          setOpen(false);
          break;
        }
        case "l": {
          window.open(
            "https://www.linkedin.com/in/jesse-koldewijn-5914531a3",
            "_blank",
          );
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
    <CommandMenuContext.Provider value={{ open, setOpen }}>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem>
              <LuUser className="mr-2 h-4 w-4" />
              <span>Home page</span>
              <CommandShortcut>⌘H</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <LuUser className="mr-2 h-4 w-4" />
              <span>About Me</span>
              <CommandShortcut>⌘M</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <LuList className="mr-2 h-4 w-4" />
              <span>My Projects</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <LuListChecks className="mr-2 h-4 w-4" />
              <span>My Experience</span>
              <CommandShortcut>⌘E</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <LuListChecks className="mr-2 h-4 w-4" />
              <span>My Blog</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <LuListChecks className="mr-2 h-4 w-4" />
              <span>OpenSource</span>
              <CommandShortcut>⌘O</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Socials">
            <CommandItem>
              <X className="ml-[.15rem] mr-2 !h-4 !w-4" />
              <span>X/Twitter</span>
              <CommandShortcut>⌘X</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <LuGithub className="mr-2 h-4 w-4" />
              <span>Github</span>
              <CommandShortcut>⌘G</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <LuLinkedin className="mr-2 h-4 w-4" />
              <span>LinkedIn</span>
              <CommandShortcut>⌘L</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      {children}
    </CommandMenuContext.Provider>
  );
};

export default CommandMenuProvider;

export const useCommandMenu = () => {
  const { open, setOpen } = useContext(CommandMenuContext);

  if (!open || !setOpen) {
    throw new Error("CommandMenu is not open");
  }

  return { open, setOpen };
};
