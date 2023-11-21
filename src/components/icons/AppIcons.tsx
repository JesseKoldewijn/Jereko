import dynamic from "next/dynamic";

const X = dynamic(() => import("@/components/icons/Twitter-X"));
const Home = dynamic(() => import("lucide-react").then((mod) => mod.Home));
const ListIcon = dynamic(() => import("lucide-react").then((mod) => mod.List));
const ListChecks = dynamic(() =>
  import("lucide-react").then((mod) => mod.ListChecks),
);
const Linkedin = dynamic(() =>
  import("lucide-react").then((mod) => mod.Linkedin),
);
const Github = dynamic(() => import("lucide-react").then((mod) => mod.Github));

const HandIcon = dynamic(() => import("lucide-react").then((mod) => mod.Hand));
const LucideComputer = dynamic(() =>
  import("lucide-react").then((mod) => mod.Computer),
);
const LucideHeartHandshake = dynamic(() =>
  import("lucide-react").then((mod) => mod.HeartHandshake),
);

const AppIcons = {
  socials: {
    github: Github,
    linkedin: Linkedin,
    twitter: X,
  },
  internal: {
    home: Home,
    projects: ListIcon,
    experience: ListChecks,
  },
  aboutMe: {
    intro: HandIcon,
    hobbies: LucideComputer,
    volunteering: LucideHeartHandshake,
  },
};
export default AppIcons;
