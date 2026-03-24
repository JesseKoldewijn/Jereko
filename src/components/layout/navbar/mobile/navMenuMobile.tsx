"use client";

import { navigate } from "astro:transitions/client";

import { useEffect, useRef, useState } from "react";

import { LuClose } from "@/icons/lu/Close";
import { LuMenu } from "@/icons/lu/Menu";

import { Button } from "@/components/ui/button";
import { type Socials } from "@/data/socials";
import { useHeaderContext } from "@/providers/HeaderProvider";

import NavMenuMobileContent from "./navMenuMobileContent";

const FAST_CLOSE_MS = 64;

const openMenu = (
  menuRef: React.RefObject<HTMLDivElement | null>,
  setIsMobileMenuOpen: (_open: boolean) => void,
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setIsMobileMenuOpen(true);
  const el = menuRef.current;
  if (!el) return;
  el.style.userSelect = "auto";
  el.style.cursor = "auto";
  el.style.opacity = "1";
  setShowMenu(true);
};

const closeMenu = (
  menuRef: React.RefObject<HTMLDivElement | null>,
  setIsMobileMenuOpen: (_open: boolean) => void,
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const el = menuRef.current;
  if (!el) return;
  el.style.userSelect = "none";
  el.style.cursor = "default";
  el.style.opacity = "0";
  setIsMobileMenuOpen(false);
  setTimeout(() => {
    setShowMenu(false);
  }, 700);
};

const closeMenuFast = (
  menuRef: React.RefObject<HTMLDivElement | null>,
  setIsMobileMenuOpen: (_open: boolean) => void,
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const el = menuRef.current;
  if (!el) return;
  el.style.userSelect = "none";
  el.style.cursor = "default";
  el.style.opacity = "0";
  setIsMobileMenuOpen(false);
  setTimeout(() => {
    setShowMenu(false);
  }, FAST_CLOSE_MS);
};

const NavMenuMobile = ({ socials }: { socials: Socials | null }) => {
  const { setIsMobileMenuOpen } = useHeaderContext();

  const [pathName, setPathName] = useState("");
  useEffect(() => {
    setPathName(typeof window !== "undefined" ? window.location.pathname : "");
  }, []);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showMenu]);

  useEffect(() => {
    closeMenu(menuRef, setIsMobileMenuOpen, setShowMenu);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  const handleActivateLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    external: boolean,
  ) => {
    if (external) {
      closeMenuFast(menuRef, setIsMobileMenuOpen, setShowMenu);
      return;
    }
    e.preventDefault();
    closeMenuFast(menuRef, setIsMobileMenuOpen, setShowMenu);
    window.setTimeout(() => {
      void navigate(href);
    }, FAST_CLOSE_MS);
  };

  return (
    <div className="flex max-w-full flex-col items-center justify-center md:hidden">
      <Button
        className="rounded-lg border p-2"
        onClick={() => {
          if (showMenu) {
            closeMenu(menuRef, setIsMobileMenuOpen, setShowMenu);
          } else {
            openMenu(menuRef, setIsMobileMenuOpen, setShowMenu);
          }
        }}
      >
        {showMenu ? <LuClose /> : <LuMenu />}
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
          <NavMenuMobileContent
            socials={socials}
            onActivateLink={handleActivateLink}
          />
        )}
      </div>
    </div>
  );
};

export default NavMenuMobile;
