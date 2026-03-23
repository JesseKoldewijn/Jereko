import { Button } from "@/components/ui/button";

import { type HeroSectionProps } from "./HeroSection";

const HeroSectionButtons = ({
  bannerContent,
}: Omit<
  HeroSectionProps,
  "bannerID" | "bannerImage" | "bannerFallbackImage"
>) => {
  return (
    <>
      {bannerContent.ctas && bannerContent.ctas.length == 2 ? (
        <>
          <Button className="mr-4 inline-flex items-center justify-center rounded-lg border px-5 py-3 text-center text-base font-medium hover:bg-neutral-900 hover:text-neutral-100 focus:ring-4 dark:hover:bg-neutral-100 dark:hover:text-neutral-900">
            <a
              href={bannerContent.ctas[0].url}
              className="inline-flex items-center justify-center"
              target={
                bannerContent.ctas[0].url.startsWith("http")
                  ? "_blank"
                  : undefined
              }
              rel={
                bannerContent.ctas[0].url.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
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
            </a>
          </Button>
          <Button className="inline-flex items-center justify-center rounded-lg border px-5 py-3 text-center text-base font-medium hover:bg-neutral-900 hover:text-neutral-100 focus:ring-4 dark:hover:bg-neutral-100 dark:hover:text-neutral-900">
            <a
              href={bannerContent.ctas[1].url}
              target={
                bannerContent.ctas[1].url.startsWith("http")
                  ? "_blank"
                  : undefined
              }
              rel={
                bannerContent.ctas[1].url.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
            >
              {bannerContent.ctas[1].title}
            </a>
          </Button>
        </>
      ) : null}
    </>
  );
};

export default HeroSectionButtons;
