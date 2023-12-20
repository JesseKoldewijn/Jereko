import React from "react";

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { base } from "@/utils/hostname";

import ListItem from "../_parts/listItem";

interface ListItemProps {
  triggerTitle: React.ReactNode;
  showcase: {
    title: string;
    href: string;
    description: string;
  };
  links?: {
    title: string;
    href: string;
    description: string;
  }[];
}

const ShowcaseNavSection = ({
  triggerTitle,
  showcase,
  links,
}: ListItemProps) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{triggerTitle}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 bg-neutral-100 p-6 dark:bg-neutral-900 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <li className="row-span-3 rounded-lg bg-black text-white dark:bg-neutral-100 dark:text-neutral-900">
            <NavigationMenuLink asChild>
              <a
                className="from-muted/50 flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b to-muted p-6 no-underline outline-none focus:shadow-md"
                href={showcase.href}
                target={
                  !showcase.href.startsWith("/")
                    ? !showcase.href.includes(base)
                      ? "_blank"
                      : undefined
                    : undefined
                }
              >
                <div className="mb-2 mt-4 text-base font-semibold">
                  {showcase.title}
                </div>
                <p className="text-sm leading-tight opacity-90">
                  {showcase.description}
                </p>
              </a>
            </NavigationMenuLink>
          </li>
          {links && links.length > 0
            ? links.map((link, idx) => (
                <ListItem
                  key={idx}
                  href={link.href}
                  title={link.title}
                  target={
                    !link.href.startsWith("/")
                      ? !link.href.includes(base)
                        ? "_blank"
                        : undefined
                      : undefined
                  }
                >
                  {link.description}
                </ListItem>
              ))
            : null}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default ShowcaseNavSection;
