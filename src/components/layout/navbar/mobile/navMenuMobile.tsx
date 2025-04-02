"use client";

import { usePathname } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import { LuClose } from "@/icons/lu/Close";
import { LuMenu } from "@/icons/lu/Menu";

import { Button } from "@/components/ui/button";
import { useHeaderContext } from "@/providers/HeaderProvider";
import { type Socials } from "@/server/db/schemas/socials";

import NavMenuMobileContent from "./navMenuMobileContent";

const openMenu = (
  menuRef: React.RefObject<HTMLDivElement>,
  setIsMobileMenuOpen: (_open: boolean) => void,
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setIsMobileMenuOpen(true);
  menuRef.current!.style.userSelect = "auto";
  menuRef.current!.style.cursor = "auto";
  menuRef.current!.style.opacity = "1";
  setShowMenu(true);
};

const closeMenu = (
  menuRef: React.RefObject<HTMLDivElement>,
  setIsMobileMenuOpen: (_open: boolean) => void,
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  menuRef.current!.style.userSelect = "none";
  menuRef.current!.style.cursor = "default";
  menuRef.current!.style.opacity = "0";
  setIsMobileMenuOpen(false);
  setTimeout(() => {
    setShowMenu(false);
  }, 700);
};

const NavMenuMobile = ({ socials }: { socials: Socials | null }) => {
  const { setIsMobileMenuOpen } = useHeaderContext();

  const pathName = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null as any as HTMLDivElement);

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
        {showMenu && <NavMenuMobileContent socials={socials} />}
      </div>
    </div>
  );
};

export default NavMenuMobile;
