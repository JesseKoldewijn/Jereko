import type { SocialInsert } from "@/server/db/schemas/socials";

export const initialSocials: SocialInsert[] = [
  {
    label: "GitHub",
    platform: "github",
    username: "JesseKoldewijn",
    link: "https://github.com/JesseKoldewijn",
  },
  {
    label: "LinkedIn",
    platform: "linkedin",
    username: "jesse-koldewijn",
    link: "https://www.linkedin.com/in/jesse-koldewijn-5914531a3",
  },
  {
    label: "X (formerly known as Twitter)",
    platform: "twitter",
    username: "dull_joker",
    link: "https://x.com/dull_joker",
  },
];
