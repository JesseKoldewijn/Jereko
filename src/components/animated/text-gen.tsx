"use client";

import { motion, stagger, useAnimate } from "framer-motion";
import { memo, useEffect } from "react";

import { cn } from "@/lib/utils";

export const TextGen = memo(
  ({ words, className }: { words: string; className?: string }) => {
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
    }, [scope.current]);

    return (
      <div className={className}>
        <div className="mt-4">
          <div className="text-2xl leading-snug tracking-wide text-black dark:text-white">
            <RenderWords wordsArray={wordsArray} scope={scope} />
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    const wordsIsSame = prevProps.words === nextProps.words;
    const classNameIsSame = prevProps.className === nextProps.className;
    return wordsIsSame || classNameIsSame;
  },
);
TextGen.displayName = "TextGen";

const RenderWords = memo(
  ({
    wordsArray,
    scope,
  }: {
    wordsArray: string[];
    scope: React.RefObject<HTMLDivElement>;
  }) => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="text-black opacity-0 dark:text-white"
            >
              {`${word} `}
            </motion.span>
          );
        })}
      </motion.div>
    );
  },
  (prevProps, nextProps) => {
    const arrayIsSame = prevProps.wordsArray === nextProps.wordsArray;
    const scopeIsSame = prevProps.scope === nextProps.scope;
    return arrayIsSame || scopeIsSame;
  },
);
RenderWords.displayName = "RenderWords";
