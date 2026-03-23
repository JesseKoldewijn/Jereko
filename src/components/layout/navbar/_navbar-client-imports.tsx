"use client";

import NavbarMenu from "@/components/layout/navbar/navigationMenu";
import ThemeToggle from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { useHeaderContext } from "@/providers/HeaderProvider";

export { ThemeToggle, NavbarMenu };

export const NavbarBackgroundWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isMobileMenuOpen } = useHeaderContext();

  return (
    <nav
      className={cn(
        "max-w-auto sticky top-0 z-50 flex w-full px-6 py-4 !transition-colors !duration-200 !ease-in-out",
        {
          "bg-[rgba(255,255,255,0.90)] dark:bg-[rgba(10,10,10,0.90)]":
            isMobileMenuOpen,
          "bg-[rgba(255,255,255,0.85)] dark:bg-[rgba(18,18,18,0.80)]":
            !isMobileMenuOpen,
        },
      )}
    >
      {children}
    </nav>
  );
};
