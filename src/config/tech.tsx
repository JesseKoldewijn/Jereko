import AstroIcon from "platformicons/svg_80x80/astro.svg";

import ReactIcon from "platformicons/svg_80x80/react.svg";

import AceternityIcon from "@/images/technologies/aceternity-ui.png";
import ShadcnIcon from "@/images/technologies/shadcn-ui.png";
import TailwindIcon from "@/images/technologies/tailwindcss.svg";
import TypescriptIcon from "@/images/technologies/typescript.svg";

export const usedTechnologies = [
  {
    name: "Astro",
    icon: AstroIcon,
  },
  {
    name: "React",
    icon: ReactIcon,
  },
  {
    name: "TypeScript",
    icon: TypescriptIcon,
  },
  {
    name: "Tailwind CSS",
    icon: TailwindIcon,
  },
  {
    name: "Shadcn UI",
    icon: ShadcnIcon,
  },
  {
    name: "Aceternity UI",
    icon: AceternityIcon,
  },
] as const;
