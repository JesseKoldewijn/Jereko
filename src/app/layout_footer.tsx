"use client";

import dynamic from "next/dynamic";

export const TechUsedSectionNew = dynamic(
  () => import("@/components/layout/footer/tech-used"),
  {
    ssr: false,
    loading: () => (
      <div className="mx-4 mb-4 w-auto rounded-xl border bg-neutral-100 py-2 dark:bg-neutral-900 md:mx-4 md:mb-8 lg:mx-8">
        <section className="w-auto py-4 md:py-10 lg:py-12">
          <div className="container grid gap-4 px-4 text-center md:gap-5 md:px-6 lg:gap-10">
            <div className="space-y-3">
              <strong className="text-lg font-bold tracking-tighter sm:text-xl md:text-2xl">
                Tech used in my website
              </strong>
            </div>
            <div className="infinite-scroll-mask scroller flex min-h-[92px] w-full items-center gap-8 md:min-h-[112px]">
              {Array(12)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="min-h-[60px] min-w-[60px] animate-pulse rounded-md bg-neutral-200 p-4 dark:bg-neutral-800 md:min-h-20 md:min-w-20"
                  />
                ))}
            </div>
          </div>
        </section>
      </div>
    ),
  },
);
