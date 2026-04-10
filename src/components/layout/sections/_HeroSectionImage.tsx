"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { type BannerImage, type HeroSectionProps } from "./HeroSection";

/** Read current theme directly from the DOM — works across Astro island boundaries. */
const getDOMTheme = () =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";

const HeroSectionImage = ({
  bannerImage,
  bannerFallbackImage,
  bannerID,
}: Omit<HeroSectionProps, "bannerContent"> & {
  bannerID?: string;
}) => {
  const [isError, setIsError] = useState(false);
  // Lazy initializer: reads the DOM class on first client render so the correct
  // theme is known before useEffect fires — avoids an initial dark→light flash.
  const [domTheme, setDomTheme] = useState<"dark" | "light">(() =>
    typeof document !== "undefined" ? getDOMTheme() : "dark",
  );

  // Watch for class mutations on <html> (e.g. next-themes toggling .dark/.light).
  // Debounced with setTimeout(0) so we only read the *final* settled classList
  // after next-themes' synchronous remove+add cycle, preventing a spurious
  // dark→light→dark flash in dark mode.
  useEffect(() => {
    let debounce: ReturnType<typeof setTimeout>;

    const observer = new MutationObserver(() => {
      clearTimeout(debounce);
      debounce = setTimeout(() => setDomTheme(getDOMTheme()), 0);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
      clearTimeout(debounce);
    };
  }, []);

  const [currentBannerImage, setCurrentBannerImage] = useState<BannerImage>(
    bannerImage.dark,
  );

  const [currentFallbackBannerImage, setCurrentFallbackBannerImage] = useState<
    BannerImage | undefined
  >(bannerFallbackImage?.dark);

  useEffect(() => {
    setCurrentBannerImage(
      domTheme === "dark" ? bannerImage.dark : bannerImage.light,
    );

    if (bannerFallbackImage) {
      setCurrentFallbackBannerImage(
        domTheme === "dark"
          ? bannerFallbackImage.dark
          : bannerFallbackImage.light,
      );
    }
  }, [domTheme]);

  const imgClass = cn(
    "aboslute !top-[(50%-50px)] left-1/2 -mt-5 max-h-75 w-auto rounded-b-full object-fill",
  );

  const isFallback = isError && !!currentFallbackBannerImage;
  const imageSrc = isFallback
    ? currentFallbackBannerImage!.src
    : currentBannerImage.src;

  const component = (
    <img
      id={bannerID}
      src={imageSrc}
      width={
        isFallback
          ? currentFallbackBannerImage!.width
          : currentBannerImage.width
      }
      height={
        isFallback
          ? currentFallbackBannerImage!.height
          : currentBannerImage.height
      }
      className={imgClass}
      alt="hero"
      onError={() => setIsError(true)}
      loading="eager"
    />
  );

  return (
    <div className="relative my-auto mr-auto ml-auto h-auto max-h-75 w-auto scale-[calc(100%+2%)] rounded-full lg:mr-0 lg:max-h-125 dark:bg-neutral-900">
      {component}
    </div>
  );
};

export default HeroSectionImage;
