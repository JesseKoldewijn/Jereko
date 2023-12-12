import React from "react";

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { base } from "@/utils/hostname";

import ListItem from "../_parts/listItem";

interface ListItemProps {
  triggerTitle: React.ReactNode;
  links: {
    title: string;
    href: string;
    description: string;
  }[];
}

const ListedNavSection = ({ triggerTitle, links }: ListItemProps) => {
  if (!links || links.length === 0) return null;

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{triggerTitle}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 bg-neutral-100 p-4 dark:bg-neutral-900 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          {links.map((link, idx) => (
            <ListItem
              key={idx}
              title={link.title}
              href={link.href}
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
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default ListedNavSection;
