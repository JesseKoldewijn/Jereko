import React from "react";

import Link from "next/link";

import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { base } from "@/utils/hostname";

interface SingleItemSectionProps {
  children: React.ReactNode;
  href: string;
}

const SingleItemSection = ({ children, href }: SingleItemSectionProps) => {
  return (
    <NavigationMenuItem>
      <Link
        href={href}
        target={
          !href.startsWith("/")
            ? !href.includes(base)
              ? "_blank"
              : undefined
            : undefined
        }
        legacyBehavior
        passHref
      >
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {children}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

export default SingleItemSection;
