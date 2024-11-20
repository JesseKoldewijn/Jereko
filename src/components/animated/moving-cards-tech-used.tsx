"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";

import { type usedTechnologies } from "@/config/tech";
import { cn } from "@/lib/utils";

export const InfiniteMovingCardsTechUsed = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: typeof usedTechnologies;
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  const addAnimation = async () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  };

  useEffect(() => {
    addAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll-x",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => {
          const isVercel = item.name === "Vercel";
          const isDarkLogo = item.name === "v0 (by Vercel)" || isVercel;
          const isDrizzleORM = item.name === "DrizzleORM";
          const isTwLogo = item.name === "Tailwind CSS";
          const isStorybook = item.name === "Storybook";
          const lightLogo = isStorybook || isTwLogo;
          const isShadcn = item.name === "Shadcn UI";
          const isAceternity = item.name === "Aceternity UI";

          return (
            <li
              key={`${item.name}-row-1-${idx}`}
              typeof="img"
              className={cn(
                {
                  "rounded-lg bg-neutral-900 dark:bg-neutral-100": isDarkLogo,
                  "inset-0 rounded-lg": isDrizzleORM,
                  "pl-2 pr-1": isVercel,
                  "rounded-lg bg-neutral-300": isShadcn,
                  "rounded-lg bg-neutral-950 dark:bg-neutral-100":
                    isAceternity || lightLogo,
                },
                "relative h-[60px] md:h-[80px]",
              )}
            >
              {isDrizzleORM && (
                <div className="absolute -inset-0 rounded-lg bg-lime-400" />
              )}
              <Image
                alt={`${item.name} Logo`}
                className={cn(
                  isDarkLogo && "invert dark:invert-0",
                  isShadcn &&
                    "bg-neutral-950 invert-0 dark:bg-neutral-100 dark:invert",
                  isAceternity && "invert-0 dark:invert",
                  isVercel && "aspect-square",
                  lightLogo &&
                    "hue-rotate-180 invert dark:hue-rotate-0 dark:invert-0",
                  !isStorybook && !isTwLogo && "aspect-square",
                  isDrizzleORM ? "z-30 rounded-md" : "rounded-lg",
                  "relative h-[60px] w-auto flex-shrink-0 overflow-hidden object-cover object-center md:h-[80px] md:min-h-[80px] md:w-auto",
                )}
                src={item.icon}
                width={200}
                height={200}
                loading="lazy"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
