import { InfiniteMovingCardsTechUsed } from "@/components/animated/moving-cards-tech-used";
import { type usedTechnologies } from "@/config/tech";

const TechUsed = ({ techUsed }: { techUsed: typeof usedTechnologies }) => {
  return (
    <div className="mx-4 mb-4 w-auto rounded-xl border bg-neutral-100 py-2 dark:bg-neutral-900 md:mx-4 md:mb-8 lg:mx-8">
      <section className="w-auto py-4 md:py-10 lg:py-12">
        <div className="container grid gap-4 px-4 text-center md:gap-5 md:px-6 lg:gap-10">
          <div className="space-y-3">
            <strong className="text-lg font-bold tracking-tighter sm:text-xl md:text-2xl">
              Tech used in my website
            </strong>
          </div>
          <div className="infinite-scroll-mask scroller w-full">
            <InfiniteMovingCardsTechUsed speed="slow" items={techUsed} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechUsed;
