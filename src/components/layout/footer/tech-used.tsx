"use client";

import Image from "next/image";

import { type usedTechnologies } from "@/config/tech";
import { cn } from "@/lib/utils";

const MiddleSection = ({
  itemKey,
  techUsed,
}: {
  itemKey: number | string;
  techUsed: typeof usedTechnologies;
}) => {
  return (
    <ul
      className="animate-infinite-scroll relative mx-4 flex items-center justify-center gap-4 md:justify-start [&_img]:max-w-none [&_li]:px-8"
      aria-hidden="true"
    >
      {techUsed.flatMap((tech) => {
        const isDarkLogo =
          tech.name === "v0 (by Vercel)" || tech.name === "Vercel";
        const isTwLogo = tech.name === "Tailwind CSS";
        const isDrizzleORM = tech.name === "DrizzleORM";

        return (
          <div
            key={tech.name + "row-2" + "-ext-key-" + itemKey}
            typeof="img"
            className={cn(
              isDarkLogo && "rounded-lg dark:bg-neutral-300",
              isTwLogo && "rounded-lg bg-neutral-300",
              isDrizzleORM && "inset-0 rounded-lg bg-lime-300",
              "relative",
            )}
          >
            <Image
              alt={`${tech.name} Logo`}
              className="h-[80px] w-auto overflow-hidden rounded-lg object-contain object-center"
              src={tech.icon}
              loading="lazy"
            />
          </div>
        );
      })}
    </ul>
  );
};

const TechUsed = ({ techUsed }: { techUsed: typeof usedTechnologies }) => {
  return (
    <div className="mx-4 mb-4 w-auto rounded-xl bg-neutral-300 !bg-opacity-70 py-2 backdrop-blur-md dark:bg-neutral-800 md:mx-4 md:mb-8">
      <section className="w-auto py-4 md:py-10 lg:py-12">
        <div className="container grid gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <strong className="text-lg font-bold tracking-tighter sm:text-xl md:text-2xl">
              Tech used in my website
            </strong>
          </div>
          <div className="infinite-scroll-mask mx-0 inline-flex w-full flex-nowrap overflow-hidden">
            <ul className="animate-infinite-scroll relative flex items-center justify-center gap-4 md:justify-start [&_img]:max-w-none [&_li]:px-8">
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
                      isDarkLogo && "rounded-lg dark:bg-neutral-300",
                      isTwLogo && "rounded-lg bg-neutral-300",
                      isDrizzleORM && "inset-0 rounded-lg bg-lime-300",
                      "relative",
                    )}
                  >
                    <Image
                      alt={`${tech.name} Logo`}
                      className="mx-0 h-[80px] w-auto overflow-hidden rounded-lg object-contain object-center"
                      src={tech.icon}
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </ul>
            <MiddleSection itemKey={1} techUsed={techUsed} />
            <MiddleSection itemKey={2} techUsed={techUsed} />
            <MiddleSection itemKey={3} techUsed={techUsed} />
            <MiddleSection itemKey={4} techUsed={techUsed} />
            <MiddleSection itemKey={5} techUsed={techUsed} />
            <ul
              className="animate-infinite-scroll relative mr-4 flex items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:px-8"
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
                      isDarkLogo && "rounded-lg dark:bg-neutral-300",
                      isTwLogo && "rounded-lg bg-neutral-300",
                      isDrizzleORM && "inset-0 rounded-lg bg-lime-300",
                      "relative",
                    )}
                  >
                    <Image
                      alt={`${tech.name} Logo`}
                      className="h-[80px] w-auto overflow-hidden rounded-lg object-contain object-center"
                      src={tech.icon}
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechUsed;
