import { appConfig } from "@/config/app";

export interface NavLink {
  title: string;
  href: string;
  description: string;
}

export interface NavShowcaseEntry {
  showcase: {
    title: string;
    href: string;
    description: string;
  };
  links: NavLink[];
}

export interface NavListedEntry {
  links: NavLink[];
}

export const showcaseLinks: NavShowcaseEntry = {
  showcase: {
    title: "Jesse Koldewijn",
    href: "https://www.linkedin.com/in/jesse-koldewijn-5914531a3",
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

export const listedLinks: NavListedEntry = {
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

export const openSourceLink = {
  title: "OpenSource",
  href: appConfig.repo.href,
} as const;

/** Extract icon key from an internal nav href (e.g. "/projects" → "projects", "/" → "home") */
export function getInternalIconKey(href: string): string {
  const segment = href.split("/")[1];
  return segment !== "" && segment != null ? segment : "home";
}

/** Extract icon key from an about-me sub-page href (e.g. "/about-me/hobbies" → "hobbies", "/about-me" → "root") */
export function getAboutMeIconKey(href: string): string {
  const segment = href.split("/")[2];
  return segment !== "" && segment != null ? segment : "root";
}
