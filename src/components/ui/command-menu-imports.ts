import dynamic from "next/dynamic";

export const CommandDialog = dynamic(
  import("./command").then((mod) => mod.CommandDialog),
  {
    ssr: false,
  },
);
export const CommandEmpty = dynamic(
  () => import("./command").then((mod) => mod.CommandEmpty),
  {
    ssr: false,
  },
);
export const CommandGroup = dynamic(
  () => import("./command").then((mod) => mod.CommandGroup),
  {
    ssr: false,
  },
);
export const CommandInput = dynamic(
  () => import("./command").then((mod) => mod.CommandInput),
  {
    ssr: false,
  },
);
export const CommandItem = dynamic(
  () => import("./command").then((mod) => mod.CommandItem),
  {
    ssr: false,
  },
);
export const CommandList = dynamic(
  () => import("./command").then((mod) => mod.CommandList),
  {
    ssr: false,
  },
);
export const CommandSeparator = dynamic(
  () => import("./command").then((mod) => mod.CommandSeparator),
  {
    ssr: false,
  },
);
export const CommandShortcut = dynamic(
  () => import("./command").then((mod) => mod.CommandShortcut),
  {
    ssr: false,
  },
);
