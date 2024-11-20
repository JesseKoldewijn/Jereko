"use client";

import { LuArrowUp } from "@/icons/lu/ArrowUp";

import { Button } from "@/components/ui/button";

const ToTopButton = () => {
  return (
    <Button
      className="rounded-lg px-2 py-1 text-neutral-800 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-400"
      variant="ghost"
      onClick={() =>
        typeof window && window.scrollTo({ top: 0, behavior: "smooth" })
      }
    >
      <LuArrowUp className="m-auto h-5 w-5" height={5} width={5} />
      <span className="sr-only">Back to top</span>
    </Button>
  );
};

export default ToTopButton;
