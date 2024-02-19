"use client";

import { m, stagger, useAnimate } from "framer-motion";
import { memo, useEffect } from "react";

export const TextGen = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
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
