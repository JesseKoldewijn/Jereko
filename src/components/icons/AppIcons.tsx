import { type IconType } from "react-icons";
import {
  LuComputer,
  LuHand,
  LuHeartHandshake,
  LuHome,
  LuList,
  LuListChecks,
} from "react-icons/lu";

import dynamic from "next/dynamic";

import X from "@/components/icons/Twitter-X";

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
    twitter: X as IconType,
  },
  internal: {
    home: LuHome,
    projects: LuList,
    experience: LuListChecks,
  },
  aboutMe: {
    intro: LuHand,
    hobbies: LuComputer,
    volunteering: LuHeartHandshake,
  },
};
export default AppIcons;
