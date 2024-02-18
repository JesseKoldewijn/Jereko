import { type IconType } from "react-icons";
import {
  LuComputer,
  LuGithub,
  LuHand,
  LuHeartHandshake,
  LuHome,
  LuLinkedin,
  LuList,
  LuListChecks,
} from "react-icons/lu";

import X from "@/components/icons/Twitter-X";

const AppIcons = {
  socials: {
    github: LuGithub,
    linkedin: LuLinkedin,
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
