"use client";

import { useTheme } from "next-themes";

import Image, { type StaticImageData } from "next/image";

import { useEffect, useState } from "react";

import { appConfig } from "@/config/app";

import { type HeroSectionProps } from "./HeroSection";

const HeroSectionImage = ({
  bannerImage,
  bannerFallbackImage,
  bannerID,
}: Omit<HeroSectionProps, "bannerContent"> & {
  bannerID?: string;
}) => {
  const [isError, setIsError] = useState(false);

  const { systemTheme, theme } = useTheme();
  const actualCurrentTheme = theme == "system" ? systemTheme : theme;

  const [currentBannerImage, setCurrentBannerImage] = useState<StaticImageData>(
    actualCurrentTheme == "dark"
      ? bannerImage.dark
      : actualCurrentTheme == "light"
        ? bannerImage.light
        : bannerImage.dark,
  );

  const [currentFallbackBannerImage, setCurrentFallbackBannerImage] = useState<
    StaticImageData | undefined
  >(
    actualCurrentTheme == "dark"
      ? bannerFallbackImage?.dark
      : actualCurrentTheme == "light"
        ? bannerFallbackImage?.light
        : bannerFallbackImage?.dark,
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

    if (bannerFallbackImage) {
      setCurrentFallbackBannerImage(
        actualCurrentTheme == "dark"
          ? bannerFallbackImage.dark
          : actualCurrentTheme == "light"
            ? bannerFallbackImage.light
            : bannerFallbackImage.dark,
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  if (isError && currentFallbackBannerImage) {
    if (
      !currentFallbackBannerImage.src.startsWith(appConfig.cdn.openCdn.baseUrl)
    ) {
      return (
        <Image
          id={bannerID}
          src={currentFallbackBannerImage}
          className="-top-[0%] my-auto ml-auto mr-auto block max-h-[300px] w-auto scale-[calc(100%+2%)] rounded-full bg-neutral-100 bg-clip-content dark:bg-neutral-900 lg:mr-0 lg:max-h-[500px]"
          alt="hero"
          onError={() => setIsError(true)}
          priority
        />
      );
    }

    return (
      <img
        id={bannerID}
        src={currentFallbackBannerImage.src}
        width={currentFallbackBannerImage.width}
        height={currentFallbackBannerImage.height}
        className="-top-[0%] my-auto ml-auto mr-auto block max-h-[300px] w-auto scale-[calc(100%+2%)] rounded-full bg-neutral-100 bg-clip-content dark:bg-neutral-900 lg:mr-0 lg:max-h-[500px]"
        alt="hero"
        onError={() => setIsError(true)}
        loading="eager"
      />
    );
  }

  if (!currentBannerImage.src.startsWith(appConfig.cdn.openCdn.baseUrl)) {
    return (
      <Image
        id={bannerID}
        src={currentBannerImage}
        className="-top-[0%] my-auto ml-auto mr-auto block max-h-[300px] w-auto scale-[calc(100%+2%)] rounded-full bg-neutral-100 bg-clip-content dark:bg-neutral-900 lg:mr-0 lg:max-h-[500px]"
        alt="hero"
        onError={() => setIsError(true)}
        priority
      />
    );
  }

  return (
    <img
      id={bannerID}
      src={currentBannerImage.src}
      width={currentBannerImage.width}
      height={currentBannerImage.height}
      className="-top-[0%] my-auto ml-auto mr-auto block max-h-[300px] w-auto scale-[calc(100%+2%)] rounded-full bg-neutral-100 bg-clip-content dark:bg-neutral-900 lg:mr-0 lg:max-h-[500px]"
      alt="hero"
      onError={() => setIsError(true)}
      loading="eager"
    />
  );
};

export default HeroSectionImage;
