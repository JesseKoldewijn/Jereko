import { X } from "@/icons/custom/Twitter-X";
import { LuComputer } from "@/icons/lu/Computer";
import { LuGithub } from "@/icons/lu/Github";
import { LuHand } from "@/icons/lu/Hand";
import { LuHeartHandshake } from "@/icons/lu/HeartHandshake";
import { LuHome } from "@/icons/lu/Home";
import { LuLinkedin } from "@/icons/lu/LinkedIn";
import { LuList } from "@/icons/lu/List";
import { LuListChecks } from "@/icons/lu/ListChecks";

const AppIcons = {
  socials: {
    github: LuGithub,
    linkedin: LuLinkedin,
    twitter: X,
  },
  internal: {
    home: LuHome,
    projects: LuList,
    experience: LuListChecks,
  },
  aboutMe: {
    root: LuHand,
    intro: LuHand,
    hobbies: LuComputer,
    volunteering: LuHeartHandshake,
  },
} as const;

export default AppIcons;
