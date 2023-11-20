"use client";

import Image from "next/image";

import { type usedTechnologies } from "@/config/tech";

const TechUsed = ({ techUsed }: { techUsed: typeof usedTechnologies }) => {
  return (
    <div className="mx-4 mb-4 w-auto rounded-xl bg-neutral-300 !bg-opacity-70 px-8 py-4 backdrop-blur-md dark:bg-neutral-800 md:mx-8 md:mb-8">
      <section className="w-full overflow-x-auto py-12 md:py-24 lg:py-32">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <strong className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Tech used in my website
            </strong>
          </div>
          <div className="flex w-full transform items-center justify-start gap-8 overflow-x-scroll transition-all duration-200 ease-in-out lg:gap-12 [&>img]:mx-auto">
            {techUsed.flatMap((tech) => {
              return (
                <Image
                  key={tech.name}
                  alt={`${tech.name} Logo`}
                  className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                  src={tech.icon}
                  height="70"
                  width="140"
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechUsed;
