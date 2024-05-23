"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import Image, { type StaticImageData } from "next/image";

import { type HeroSectionProps } from "./HeroSection";

const HeroSectionImage = ({
  bannerImage,
  bannerID,
}: Omit<HeroSectionProps, "bannerContent"> & {
  bannerID?: string;
}) => {
  const { systemTheme, theme } = useTheme();
  const actualCurrentTheme = theme == "system" ? systemTheme : theme;

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
    <Image
      id={bannerID}
      src={currentBannerImage}
      className="-top-[0%] my-auto ml-auto mr-auto block max-h-[300px] w-auto scale-[calc(100%+2%)] rounded-full bg-neutral-100 bg-clip-content dark:bg-neutral-900 lg:mr-0 lg:max-h-[500px]"
      alt="hero image"
      priority
    />
  );
};

export default HeroSectionImage;
