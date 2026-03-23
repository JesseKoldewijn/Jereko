export const events = [
  {
    name: "Vercel Ship '25",
    location: "Remote",
    description: "Vercel's one-day event for business leaders and developers.",
    skills: ["Infra", "DevOps", "Cloud"].toString(),
    url: "https://www.youtube.com/watch?v=EfiKu56xvJk",
    url_type: "video" as const,
    day: "25",
    month: "06",
    year: "2025",
  },
  {
    name: "Vercel Ship '24",
    location: "Remote",
    description: "Vercel's one-day event for business leaders and developers.",
    skills: ["Infra", "DevOps", "Cloud"].toString(),
    day: "25",
    month: "06",
    year: "2024",
  },
  {
    name: "Vercel Ship '23",
    location: "Remote",
    description: "Vercel's one-day event for business leaders and developers.",
    skills: ["Infra", "DevOps", "Cloud"].toString(),
    day: "25",
    month: "06",
    year: "2023",
  },
  {
    name: "Vercel Ship '22",
    location: "Remote",
    description: "Vercel's one-day event for business leaders and developers.",
    skills: ["Infra", "DevOps", "Cloud"].toString(),
    day: "25",
    month: "06",
    year: "2022",
  },
  {
    name: "Vercel Ship '21",
    location: "Remote",
    description: "Vercel's one-day event for business leaders and developers.",
    skills: ["Infra", "DevOps", "Cloud"].toString(),
    day: "25",
    month: "06",
    year: "2021",
  },
] as const;

export type Event = (typeof events)[number];
export type Events = readonly Event[];
