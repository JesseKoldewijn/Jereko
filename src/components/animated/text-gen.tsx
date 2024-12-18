"use client";

import { m, stagger } from "framer-motion";
import { useAnimate } from "framer-motion/mini";

import { usePathname } from "next/navigation";

import { useEffect } from "react";

import { cn } from "@/lib/utils";

export const INTERNAL_TextGenComponent = ({
  words,
  className,
  childClassName,
}: {
  words: string;
  className?: string;
  childClassName?: string;
  staggerSync?: boolean;
}) => {
  const pathName = usePathname();
  const [scope, animate] = useAnimate();

  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope.current, pathName]);

  return (
    <div className={className} data-pathname-key={pathName}>
      <div
        className={cn(
          "mt-4 text-2xl leading-snug tracking-wide text-black dark:text-white",
          childClassName,
        )}
      >
        <RenderWords wordsArray={wordsArray} scope={scope} />
      </div>
    </div>
  );
};

const RenderWords = ({
  wordsArray,
  scope,
}: {
  wordsArray: string[];
  scope: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <m.div ref={scope}>
      {wordsArray.map((word, idx) => {
        return (
          <m.span
            key={word + idx}
            className="text-black opacity-0 dark:text-white"
          >
            {`${word} `}
          </m.span>
        );
      })}
    </m.div>
  );
};
