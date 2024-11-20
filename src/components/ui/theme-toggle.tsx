"use client";

import { animate } from "framer-motion";
import { useTheme } from "next-themes";

import { LuMoon } from "@/icons/lu/Moon";
import { LuSun } from "@/icons/lu/Sun";

import { Button } from "./button";

const ThemeToggle = () => {
  const { theme, systemTheme, setTheme } = useTheme();

  const toggleTheme = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const currentTheme = theme === "system" ? systemTheme : theme;

    const body = document.querySelector("body");
    if (body) {
      animate(body, { opacity: 0 }, { duration: 0.25 });
      setTimeout(() => {
        setTheme(currentTheme === "dark" ? "light" : "dark");
        animate(body, { opacity: 1 }, { duration: 0.25 });
      }, 250);

      return;
    }

    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      className="h-10 w-10 rounded-full border p-2 hover:text-background"
      onClick={(e) => toggleTheme(e)}
    >
      <LuSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <LuMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
export default ThemeToggle;
