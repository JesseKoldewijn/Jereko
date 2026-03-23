"use client";

import React, { useLayoutEffect, useRef } from "react";

import { type usedTechnologies } from "@/config/tech";
import { cn } from "@/lib/utils";

/** Must match the number of repeated sequences in the list below. */
const MARQUEE_COPY_COUNT = 4;

type TechItem = (typeof usedTechnologies)[number];

function TechLogoLi({ item }: { item: TechItem }) {
  const isTwLogo = item.name === "Tailwind CSS";
  const lightLogo = isTwLogo;
  const isShadcn = item.name === "Shadcn UI";
  const isAceternity = item.name === "Aceternity UI";

  return (
    <li
      className={cn(
        {
          "rounded-lg bg-neutral-300": isShadcn,
          "rounded-lg bg-neutral-950 dark:bg-neutral-100":
            isAceternity || lightLogo,
        },
        "relative h-[60px] md:h-[80px]",
      )}
    >
      <img
        alt={`${item.name} Logo`}
        className={cn(
          isShadcn &&
            "bg-neutral-950 invert-0 dark:bg-neutral-100 dark:invert",
          isAceternity && "invert-0 dark:invert",
          lightLogo &&
            "hue-rotate-180 invert dark:hue-rotate-0 dark:invert-0",
          !isTwLogo && "aspect-square",
          "rounded-lg",
          "relative h-[60px] w-auto flex-shrink-0 overflow-hidden object-cover object-center md:h-[80px] md:min-h-[80px] md:w-auto",
        )}
        src={
          typeof item.icon === "string"
            ? item.icon
            : (item.icon as { src?: string }).src
        }
        width={200}
        height={200}
        loading="eager"
        decoding="async"
      />
    </li>
  );
}

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
  const listRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const ul = listRef.current;
    if (!ul) return;

    const duration =
      speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
    ul.style.setProperty("--marquee-duration", duration);
    ul.style.setProperty(
      "--marquee-anim-direction",
      direction === "left" ? "normal" : "reverse",
    );

    const syncShift = () => {
      const w = ul.scrollWidth;
      if (w <= 0) return;
      const shift = w / MARQUEE_COPY_COUNT;
      ul.style.setProperty("--tech-marquee-shift", `${shift}px`);
    };

    syncShift();

    const ro = new ResizeObserver(() => syncShift());
    ro.observe(ul);

    const imgs = ul.querySelectorAll("img");
    imgs.forEach((img) => img.addEventListener("load", syncShift));

    return () => {
      ro.disconnect();
      imgs.forEach((img) => img.removeEventListener("load", syncShift));
    };
  }, [direction, speed, items]);

  return (
    <div
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={listRef}
        className={cn(
          "tech-marquee-track flex w-max shrink-0 flex-nowrap gap-4 py-4",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {Array.from({ length: MARQUEE_COPY_COUNT }, (_, pass) =>
          items.map((item, idx) => (
            <TechLogoLi
              key={`${item.name}-p${pass}-${idx}`}
              item={item}
            />
          )),
        ).flat()}
      </ul>
    </div>
  );
};
