import dynamic from "next/dynamic";
import { type StaticImageData } from "next/image";

import AnimatedGradientText from "@/components/animated/animated-grad-text";
import { TextGen } from "@/components/animated/text-gen-dynamic";
import { cn } from "@/lib/utils";

import HeroSectionButtons from "./_HeroSectionButtons";

const HeroSectionImage = dynamic(() => import("./_HeroSectionImage"));

export interface HeroSectionProps {
  className?: string;
  bannerContent: {
    title: string;
    description: string;
    ctas?: [
      {
        title: string;
        url: string;
      },
      {
        title: string;
        url: string;
      },
    ];
  };
  bannerImage: {
    dark: StaticImageData;
    light: StaticImageData;
  };
}

const HeroSection = ({
  bannerImage,
  bannerContent,
  className,
}: HeroSectionProps) => {
  const bannerID =
    "banner-image" + String(bannerContent.title).replace(" ", "-");

  return (
    <section className={cn(className, "mx-4 h-full min-h-[495px] md:mx-8")}>
      <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:pt-16 xl:gap-0">
        <div className="mx-auto place-self-center text-center lg:col-span-7 lg:ml-0 lg:text-left">
          <AnimatedGradientText
            text={bannerContent.title}
            variant="h1"
            className={cn(
              "max-w-2xl text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl",
            )}
          />

          <TextGen
            words={bannerContent.description}
            className="max-w-2xl font-light text-neutral-500 dark:text-neutral-200 md:text-lg lg:mb-8 lg:text-xl"
          />

          <HeroSectionButtons bannerContent={bannerContent} />
        </div>
        <div className="order-first mb-8 flex max-h-[300px] min-h-[300px] transition-opacity md:mb-16 md:max-h-[500px] lg:order-last lg:col-span-5 lg:mb-0 lg:mt-0">
          <HeroSectionImage bannerImage={bannerImage} bannerID={bannerID} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
