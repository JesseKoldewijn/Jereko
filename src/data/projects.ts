export const projects = [
  {
    title: "OpenStack",
    sub_title: "Rust LocalStack-compatible AWS emulator",
    description:
      "Rust rewrite of LocalStack Community Edition. You get an API-compatible local stack for AWS-style workflows, available as a Docker image or a native binary. Many services are covered, including S3, Lambda, DynamoDB, and IAM.",
    link: "https://github.com/JesseKoldewijn/openstack",
    tags: ["Rust", "AWS", "Docker", "LocalStack", "Axum"].toString(),
    draft: "false",
  },
  {
    title: "Agnostic DevKit",
    sub_title: "Cross-browser dev toolkit extension",
    description:
      "Browser extension for day-to-day web work. Save presets for query strings, cookies, and localStorage, then apply them in one click. Import and export via JSON, shareable links, or GitHub. Use it as a popup or side panel, with light and dark themes. Built with WXT, SolidJS, and Tailwind.",
    link: "https://github.com/JesseKoldewijn/agnostic-devkit",
    tags: [
      "SolidJS",
      "TypeScript",
      "WXT",
      "Vite",
      "Tailwind CSS",
      "Playwright",
    ].toString(),
    draft: "false",
  },
  {
    title: "ChatThing",
    sub_title: "Privacy-first browser AI chat",
    description:
      "AI chat that stays in your browser. Plug in Ollama, Google Gemini, OpenRouter, or Chrome’s Prompt API for answers, including fully on-device runs when you want them. Optional encrypted storage for API keys, image input for vision models, and a PWA that works offline. Heavily tested with Vitest and Playwright. Try it at ai.jereko.dev.",
    link: "https://github.com/JesseKoldewijn/ChatThing",
    tags: [
      "React",
      "TypeScript",
      "TanStack Router",
      "Vite",
      "Tailwind CSS",
      "Vercel AI SDK",
      "PWA",
    ].toString(),
    draft: "false",
  },
  {
    title: "Graphite Desktop",
    sub_title: "A Rust based GUI application",
    description:
      "A desktop shell around Graphite’s web UI. I built it to explore Tauri (a lightweight Rust alternative to Electron) together with Next.js for the front end.",
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
      "Small CLI I wrote while learning Go. I like picking a simple, useful idea and implementing it in a language I want to get comfortable with. In this case, a username generator in Go.",
    link: "https://github.com/GlitchTech-Developments/Username-Generator",
    tags: ["GoLang", "CLI"].toString(),
    draft: "false",
  },
] as const;

export type Project = (typeof projects)[number];
export type Projects = readonly Project[];
