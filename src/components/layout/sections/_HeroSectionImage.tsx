"use client";

import { useTheme } from "next-themes";

import { useEffect, useState } from "react";

import { type BannerImage, type HeroSectionProps } from "./HeroSection";

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

  const [currentBannerImage, setCurrentBannerImage] = useState<BannerImage>(
    actualCurrentTheme == "dark"
      ? bannerImage.dark
      : actualCurrentTheme == "light"
        ? bannerImage.light
        : bannerImage.dark,
  );

  const [currentFallbackBannerImage, setCurrentFallbackBannerImage] = useState<
    BannerImage | undefined
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

  const imgClass =
    "-top-[0%] my-auto ml-auto mr-auto block max-h-[300px] w-auto scale-[calc(100%+2%)] rounded-full bg-neutral-100 bg-clip-content dark:bg-neutral-900 lg:mr-0 lg:max-h-[500px]";

  if (isError && currentFallbackBannerImage) {
    return (
      <img
        id={bannerID}
        src={currentFallbackBannerImage.src}
        width={currentFallbackBannerImage.width}
        height={currentFallbackBannerImage.height}
        className={imgClass}
        alt="hero"
        onError={() => setIsError(true)}
        loading="eager"
      />
    );
  }

  return (
    <img
      id={bannerID}
      src={currentBannerImage.src}
      width={currentBannerImage.width}
      height={currentBannerImage.height}
      className={imgClass}
      alt="hero"
      onError={() => setIsError(true)}
      loading="eager"
    />
  );
};

export default HeroSectionImage;
