import { Suspense } from "react";

import Image from "next/image";

import { type usedTechnologies } from "@/config/tech";
import { cn } from "@/lib/utils";

const _TechMapping = ({
  mapKey,
  techUsed,
}: {
  mapKey: string;
  techUsed: typeof usedTechnologies;
}) => {
  return (
    <>
      {techUsed.flatMap((tech) => {
        const isVercel = tech.name === "Vercel";
        const isDarkLogo = tech.name === "v0 (by Vercel)" || isVercel;
        const isDrizzleORM = tech.name === "DrizzleORM";
        const isTwLogo = tech.name === "Tailwind CSS";
        const isStorybook = tech.name === "Storybook";
        const lightLogo = isStorybook || isTwLogo;
        const isShadcn = tech.name === "Shadcn UI";
        const isAceternity = tech.name === "Aceternity UI";

        return (
          <div
            key={tech.name + "row-1" + `${mapKey ? `-${mapKey}` : ""}`}
            typeof="img"
            className={cn(
              isDarkLogo
                ? "rounded-lg bg-neutral-900 dark:bg-neutral-100"
                : lightLogo
                  ? "rounded-lg bg-neutral-950 dark:bg-neutral-100"
                  : isDrizzleORM
                    ? "inset-0 rounded-lg bg-lime-300"
                    : isShadcn
                      ? "rounded-lg bg-neutral-300"
                      : isAceternity
                        ? "rounded-lg bg-neutral-950 dark:bg-neutral-100"
                        : "",
              "relative",
            )}
          >
            <Image
              alt={`${tech.name} Logo`}
              className={cn(
                isDarkLogo && "invert dark:invert-0",
                isShadcn &&
                  "bg-neutral-950 invert-0 dark:bg-neutral-100 dark:invert",
                isAceternity && "invert-0 dark:invert",
                isVercel && "pl-1",
                lightLogo &&
                  "hue-rotate-180 invert dark:hue-rotate-0 dark:invert-0",
                "h-[60px] w-auto overflow-hidden rounded-lg object-contain object-center md:h-[80px]",
              )}
              src={tech.icon}
              loading="lazy"
            />
          </div>
        );
      })}
    </>
  );
};

const TechUsed = ({ techUsed }: { techUsed: typeof usedTechnologies }) => {
  return (
    <div className="mx-4 mb-4 w-auto rounded-xl border bg-neutral-100 py-2 md:mx-8 md:mb-8 dark:bg-neutral-900">
      <section className="w-auto py-4 md:py-10 lg:py-12">
        <div className="container grid gap-4 px-4 text-center md:gap-5 md:px-6 lg:gap-10">
          <div className="space-y-3">
            <strong className="text-lg font-bold tracking-tighter sm:text-xl md:text-2xl">
              Tech used in my website
            </strong>
          </div>
          <div className="infinite-scroll-mask scroller w-full">
            <div className="scroll-content animate-infinite-scroll relative flex items-center justify-center md:justify-start">
              <Suspense>
                <_TechMapping mapKey="main" techUsed={techUsed} />
              </Suspense>
            </div>
            <div
              className="scroll-content animate-infinite-scroll relative flex items-center justify-center md:justify-start"
              aria-hidden="true"
            >
              <Suspense>
                <_TechMapping mapKey="clone" techUsed={techUsed} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechUsed;
