"use client";

import { GithubIcon, List, UserIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import ListedNavSection from "./item-variants/listed";
import ShowcaseNavSection from "./item-variants/showcase";
import SingleItemSection from "./item-variants/singleItem";

const showcaseEntry = {
  triggerTitle: (
    <>
      <UserIcon className="mr-2" />
      About me
    </>
  ),
  showcase: {
    title: "Jesse Koldewijn",
    href: "/",
    description:
      "Front-End Software Engineer, with a passion for software and tech.",
  },
  links: [
    {
      title: "Introduction",
      href: "/intro",
      description:
        "Who am I? What are my goals and what do I want to achieve? Read more about it here.",
    },
    {
      title: "Hobbies",
      href: "/hobbies",
      description: "What do I do in my spare time? Read more about it here.",
    },
    {
      title: "Volunteering",
      href: "/volunteering",
      description:
        "I also volunteer as a GameLead for Stack Up. Read more about it here.",
    },
  ],
};

const listedEntry = {
  triggerTitle: (
    <>
      <List className="mr-2" />
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
        <SingleItemSection href="https://github.com/JesseKoldewijn/JKinsight">
          <GithubIcon className="mr-2" />
          OpenSource
        </SingleItemSection>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavbarMenu;
