"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import AnimatedGradientText from "@/components/animated/animated-grad-text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
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
  const { systemTheme, theme } = useTheme();
  const actualCurrentTheme = theme == "system" ? systemTheme : theme;

  const bannerID =
    "banner-image" + String(bannerContent.title).replace(" ", "-");

  const [currentBannerImage, setCurrentBannerImage] = useState<StaticImageData>(
    actualCurrentTheme == "dark"
      ? bannerImage.dark
      : actualCurrentTheme == "light"
        ? bannerImage.light
        : bannerImage.dark,
  );

  useEffect(() => {
    const actualCurrentTheme = theme == "system" ? systemTheme : theme;

    setCurrentBannerImage(
      actualCurrentTheme == "dark"
        ? bannerImage.dark
        : actualCurrentTheme == "light"
          ? bannerImage.light
          : bannerImage.dark,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return (
    <section className={cn(className, "mx-4 h-full min-h-[495px] md:mx-8")}>
      <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:pt-16 xl:gap-0">
        <div className="mx-auto place-self-center text-center lg:col-span-7 lg:ml-0 lg:text-left">
          <AnimatedGradientText
            text={bannerContent.title}
            variant="h1"
            className={cn(
              "mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl",
            )}
          />
          <p className="mb-6 max-w-2xl font-light text-neutral-500 dark:text-neutral-200 md:text-lg lg:mb-8 lg:text-xl">
            {bannerContent.description}
          </p>
          {bannerContent.ctas && bannerContent.ctas.length == 2 ? (
            <>
              <Button className="mr-4 inline-flex items-center justify-center rounded-lg border px-5 py-3 text-center text-base font-medium hover:bg-neutral-900 hover:text-neutral-100 focus:ring-4 dark:hover:bg-neutral-100 dark:hover:text-neutral-900">
                <Link
                  href={bannerContent.ctas[0].url}
                  className="inline-flex items-center justify-center"
                >
                  {bannerContent.ctas[0].title}
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </Button>
              <Button className="inline-flex items-center justify-center rounded-lg border px-5 py-3 text-center text-base font-medium hover:bg-neutral-900 hover:text-neutral-100 focus:ring-4 dark:hover:bg-neutral-100 dark:hover:text-neutral-900">
                <Link href={bannerContent.ctas[1].url}>
                  {bannerContent.ctas[1].title}
                </Link>
              </Button>
            </>
          ) : null}
        </div>
        <div className="order-first mb-8 flex max-h-[300px] min-h-[300px] transition-opacity md:mb-16 md:max-h-[500px] lg:order-last lg:col-span-5 lg:mb-0 lg:mt-0">
          <Image
            id={bannerID}
            src={currentBannerImage}
            className="-top-[0%] my-auto ml-auto mr-auto block max-h-[300px] w-auto scale-[calc(100%+2%)] rounded-full bg-neutral-100 bg-clip-content dark:bg-neutral-900 lg:mr-0 lg:max-h-[500px]"
            alt="hero image"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
