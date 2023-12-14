import { createStore } from "idb-keyval";

export const localstore = () => {
  if (typeof window === "undefined")
    return {
      projects: null,
      experience: null,
      usedTech: null,
    } as const;

  return {
    projects: createStore("jki", "projects"),
    experience: createStore("jki", "experience"),
    usedTech: createStore("jki", "usedTech"),
  } as const;
};
