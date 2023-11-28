"use client";

import Image from "next/image";

import { type usedTechnologies } from "@/config/tech";
import { cn } from "@/lib/utils";

const TechUsed = ({ techUsed }: { techUsed: typeof usedTechnologies }) => {
  return (
    <div className="mx-4 mb-4 w-auto rounded-xl bg-neutral-300 !bg-opacity-70 py-2 backdrop-blur-md dark:bg-neutral-800 md:mx-8 md:mb-8">
      <section className="w-auto py-4 md:py-10 lg:py-12">
        <div className="container grid gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <strong className="text-lg font-bold tracking-tighter sm:text-xl md:text-2xl">
              Tech used in my website
            </strong>
          </div>
          <div className="infinite-scroll-mask scroller w-full">
            <div className="scroll-content animate-infinite-scroll relative flex items-center justify-center md:justify-start">
              {techUsed.flatMap((tech) => {
                const isDarkLogo =
                  tech.name === "v0 (by Vercel)" || tech.name === "Vercel";
                const isTwLogo = tech.name === "Tailwind CSS";
                const isDrizzleORM = tech.name === "DrizzleORM";

                return (
                  <div
                    key={tech.name + "row-1"}
                    typeof="img"
                    className={cn(
                      isDarkLogo &&
                        "rounded-lg bg-neutral-900 dark:bg-neutral-300",
                      isTwLogo && "rounded-lg bg-neutral-300",
                      isDrizzleORM && "inset-0 rounded-lg bg-lime-300",
                      "relative",
                    )}
                  >
                    <Image
                      alt={`${tech.name} Logo`}
                      className={cn(
                        isDarkLogo && "invert dark:invert-0",
                        "h-[60px] w-auto overflow-hidden rounded-lg object-contain object-center md:h-[80px]",
                      )}
                      src={tech.icon}
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>
            <div
              className="scroll-content animate-infinite-scroll relative flex items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:px-8"
              aria-hidden="true"
            >
              {techUsed.flatMap((tech) => {
                const isDarkLogo =
                  tech.name === "v0 (by Vercel)" || tech.name === "Vercel";
                const isTwLogo = tech.name === "Tailwind CSS";
                const isDrizzleORM = tech.name === "DrizzleORM";

                return (
                  <div
                    key={tech.name + "row-3"}
                    typeof="img"
                    className={cn(
                      isDarkLogo &&
                        "rounded-lg bg-neutral-900 dark:bg-neutral-300",
                      isTwLogo && "rounded-lg bg-neutral-300",
                      isDrizzleORM && "inset-0 rounded-lg bg-lime-300",
                      "relative",
                    )}
                  >
                    <Image
                      alt={`${tech.name} Logo`}
                      className={cn(
                        isDarkLogo && "invert dark:invert-0",
                        "h-[60px] w-auto overflow-hidden rounded-lg object-contain object-center md:h-[80px]",
                      )}
                      src={tech.icon}
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechUsed;
