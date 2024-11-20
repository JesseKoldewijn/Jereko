"use client";

import dynamic from "next/dynamic";

import { LuGithub } from "@/icons/lu/Github";
import { LuList } from "@/icons/lu/List";
import { LuUser } from "@/icons/lu/User";

import { appConfig } from "@/config/app";

import ListedNavSection from "./item-variants/listed";
import ShowcaseNavSection from "./item-variants/showcase";
import SingleItemSection from "./item-variants/singleItem";

const NavigationMenu = dynamic(
  () =>
    import("@/components/ui/navigation-menu").then((mod) => mod.NavigationMenu),
  { ssr: true },
);
const NavigationMenuList = dynamic(
  () =>
    import("@/components/ui/navigation-menu").then(
      (mod) => mod.NavigationMenuList,
    ),
  { ssr: true },
);

export const showcaseEntry = {
  triggerTitle: (
    <>
      <LuUser className="mr-2 h-5 w-auto" />
      About me
    </>
  ),
  showcase: {
    title: "Jesse Koldewijn",
    href: "/about-me",
    description: "Software Engineer, with a passion for software and tech.",
  },
  links: [
    {
      title: "Introduction",
      href: "/about-me",
      description: "A short introduction about myself and what I do.",
    },
    {
      title: "Hobbies",
      href: "/about-me/hobbies",
      description: "What do I do in my spare time? Read more about it here.",
    },
    {
      title: "Volunteering",
      href: "/about-me/volunteering",
      description:
        "I also volunteer as a GameLead for Stack Up. Read more about it here.",
    },
  ],
};

export const listedEntry = {
  triggerTitle: (
    <>
      <LuList className="mr-2 h-5 w-auto" />
      Pages
    </>
  ),
  links: [
    {
      title: "Home",
      href: "/",
      description:
        "Go back to the homepage, and browse further through the website.",
    },
    {
      title: "All Projects",
      href: "/projects",
      description:
        "All my projects I've either build for myself or as a OSS project.",
    },
    {
      title: "Experience",
      href: "/experience",
      description: "All my current and past work and educational experience.",
    },
  ],
};

const NavbarMenu = () => {
  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
        <ShowcaseNavSection {...showcaseEntry} />
        <ListedNavSection {...listedEntry} />
        <SingleItemSection href={appConfig.repo.href}>
          <LuGithub className="mr-2 h-5 w-auto" />
          OpenSource
        </SingleItemSection>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavbarMenu;
