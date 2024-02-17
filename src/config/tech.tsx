import NextjsIcon from "platformicons/svg_80x80/nextjs.svg";
import ReactIcon from "platformicons/svg_80x80/react.svg";

import AceternityIcon from "@/images/technologies/aceternity-ui.png";
import DrizzleIcon from "@/images/technologies/drizzle.svg";
import ShadcnIcon from "@/images/technologies/shadcn-ui.png";
import StorybookIcon from "@/images/technologies/storybook.svg";
import TailwindIcon from "@/images/technologies/tailwindcss.svg";
import TypescriptIcon from "@/images/technologies/typescript.svg";
import V0 from "@/images/technologies/v0.svg";
import VercelIcon from "@/images/technologies/vercel.svg";

export const usedTechnologies = [
  {
    name: "React",
    icon: ReactIcon,
  },
  {
    name: "Next.js",
    icon: NextjsIcon,
  },
  {
    name: "Vercel",
    icon: VercelIcon,
  },
  {
    name: "v0 (by Vercel)",
    icon: V0,
  },
  {
    name: "Aceternity UI",
    icon: AceternityIcon,
  },
  {
    name: "Shadcn UI",
    icon: ShadcnIcon,
  },
  {
    name: "Tailwind CSS",
    icon: TailwindIcon,
  },
  {
    name: "Storybook",
    icon: StorybookIcon,
  },
  {
    name: "TypeScript",
    icon: TypescriptIcon,
  },
  {
    name: "DrizzleORM",
    icon: DrizzleIcon,
  },
] as const;
