import type { ProjectInsert } from "@/server/db/schemas/projects";

export const initialProjects: ProjectInsert[] = [
  {
    title: "Graphite Desktop",
    sub_title: "A Rust based GUI application",
    description:
      "This application is basically just a wrapper around the web-UI of Graphite. But nonetheless was a lot of fun to play around the the tech stack. I've used Tauri (light-weight electron alternative written in rust) and Next.js.",
    link: "https://github.com/GlitchTech-Developments/GraphiteDesktop",
    tags: [
      "Rust",
      "Tauri",
      "Typescript",
      "TailwindCSS",
      "Next.js",
      "React.js",
    ].toString(),
    draft: "false",
  },
  {
    title: "Username Generator",
    sub_title: "A simple username generator CLI",
    description:
      'This is basically just my way of learning new tech and programming languages. I pick a random application that might come in useful and try to build something fitting of this idea using something new. In this case "something new" was GoLang.',
    link: "https://github.com/GlitchTech-Developments/Username-Generator",
    tags: ["GoLang", "CLI"].toString(),
    draft: "false",
  },
];
