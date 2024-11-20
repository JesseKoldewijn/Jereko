import dynamic from "next/dynamic";

const AppIcons = {
  socials: {
    github: dynamic(
      () => import("@/icons/lu/Github").then((mod) => mod.LuGithub),
      {
        ssr: true,
      },
    ),
    linkedin: dynamic(
      () => import("@/icons/lu/LinkedIn").then((mod) => mod.LuLinkedin),
      {
        ssr: true,
      },
    ),
    twitter: dynamic(
      () => import("@/icons/custom/Twitter-X").then((mod) => mod.X),
      {
        ssr: true,
      },
    ),
  },
  internal: {
    home: dynamic(() => import("@/icons/lu/Home").then((mod) => mod.LuHome), {
      ssr: true,
    }),
    projects: dynamic(
      () => import("@/icons/lu/List").then((mod) => mod.LuList),
      {
        ssr: true,
      },
    ),
    experience: dynamic(
      () => import("@/icons/lu/ListChecks").then((mod) => mod.LuListChecks),
      {
        ssr: true,
      },
    ),
  },
  aboutMe: {
    intro: dynamic(() => import("@/icons/lu/Hand").then((mod) => mod.LuHand), {
      ssr: true,
    }),
    hobbies: dynamic(
      () => import("@/icons/lu/Computer").then((mod) => mod.LuComputer),
      {
        ssr: true,
      },
    ),
    volunteering: dynamic(
      () =>
        import("@/icons/lu/HeartHandshake").then((mod) => mod.LuHeartHandshake),
      {
        ssr: true,
      },
    ),
  },
} as const;

export default AppIcons;
