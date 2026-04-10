"use client";

import { LuGithub } from "@/icons/lu/Github";
import { LuList } from "@/icons/lu/List";
import { LuUser } from "@/icons/lu/User";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { appConfig } from "@/config/app";
import { listedLinks, showcaseLinks } from "@/data/navigation";

import ListedNavSection from "./item-variants/listed";
import ShowcaseNavSection from "./item-variants/showcase";
import SingleItemSection from "./item-variants/singleItem";

// Re-export with JSX triggerTitle fields for backward compatibility
export const showcaseEntry = {
  triggerTitle: (
    <>
      <LuUser className="mr-2 h-5 w-auto" />
      About me
    </>
  ),
  ...showcaseLinks,
};

export const listedEntry = {
  triggerTitle: (
    <>
      <LuList className="mr-2 h-5 w-auto" />
      Pages
    </>
  ),
  ...listedLinks,
};

const NavbarMenu = () => {
  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
        <ShowcaseNavSection {...showcaseEntry} />
        <ListedNavSection {...listedEntry} />
        <SingleItemSection href={appConfig.repo.href} className="flex">
          <LuGithub className="mr-2 h-5 w-auto" />
          <span>OpenSource</span>
        </SingleItemSection>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavbarMenu;
