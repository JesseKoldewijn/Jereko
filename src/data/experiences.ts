export type ExperienceRole = {
  title: string;
  description: string;
  skills: string;
  start_year: string;
  start_month: string;
  end_year: string;
  end_month: string;
};

export const experiences = [
  {
    exp_key: "iungo-1",
    title: "Full-Stack Software Engineer",
    company_name: "iungo.nl",
    location: "Zwolle, Netherlands",
    description:
      "At iungo I've primarily worked on rebuilding the mobile app from Jave / Obj-C over to React Native (Using Expo). This project was basically run by myself alone. Beside those tasks I've also worked on WebUI tasks inside the iungo web environment, firmware patches in C, C++ or Lua and some minor hardware assembly tasks whenever we didn't have any tickets anymore.",
    skills: [
      "Javascript",
      "Typescript",
      "CSS",
      "React Native",
      "Expo",
      "Mithril.js",
      "React.js",
    ].toString(),
    start_year: "2022",
    start_month: "09",
    end_year: "2023",
    end_month: "06",
  },
  {
    exp_key: "dnz-1",
    title: "Front-end Software Engineer",
    company_name: "DNZ (De Nieuwe Zaak)",
    location: "Zwolle, Netherlands",
    description:
      "At DNZ I've primarily worked on our Next.js based eCommerce storefront for Intershop webshops. However, some of our project ran on Intershop alone and not in our PWA. For these project I've worked on the ISML (Intershop Markup Language) side of things. Also done A/B test implementations, WCAG analysis and general stack innovations.",
    skills: [
      "Javascript",
      "Typescript",
      "SCSS",
      "CSS",
      "TailwindCSS",
      "Styled-Components",
      "Next.js",
      "React.js",
      "Intershop",
      "ISML",
    ].toString(),
    start_year: "2023",
    start_month: "06",
    end_year: "2024",
    end_month: "07",
  },
  {
    exp_key: "jet-1",
    company_name: "Just Eat Takeaway.com",
    location: "Enschede, Netherlands",
    roles: [
      {
        title: "Software Engineer",
        description:
          "At JET, I work on our Next.js storefronts across all markets, with expanded responsibilities: more backend work, iOS onboarding, and JustEat for Business initiatives which include the continuation of the JustEat for Business migration.",
        skills: [
          "Javascript",
          "Typescript",
          "CSS",
          "Next.js",
          "React.js",
          "Redux",
          "Go",
          "Rust",
          "Swift", 
          "SwiftUI",
          "UIKit",
          "PHP",
          ".NET",
        ].toString(),
        start_year: "2025",
        start_month: "11",
        end_year: "current",
        end_month: "current",
      },
      {
        title: "Associate Software Engineer",
        description:
          "At JET, I primarily worked on our Next.js based storefronts. My main focus was the Bistro migration for the Slovakian market and the JustEat for Business migration, large-scale projects that introduced me to the complexity of multi-country storefronts.",
        skills: [
          "Javascript",
          "Typescript",
          "CSS",
          "Next.js",
          "React.js",
          "Redux",
          "Go",
          "Rust",
          "Lua",
          "PHP",
          ".NET",
        ].toString(),
        start_year: "2024",
        start_month: "08",
        end_year: "2025",
        end_month: "11",
      },
    ],
  },
] as const;

export type Experience = (typeof experiences)[number];
export type Experiences = readonly Experience[];
