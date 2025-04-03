import type { Metadata } from "next";

import { cache } from "react";

import { LatestAttendedWrapperDynamic } from "@/components/events";
import HeroSection from "@/components/layout/sections/HeroSection";
import IntroSection from "@/components/layout/sections/IntroSection";
import Avatar from "@/images/avatar.webp";

export const generateMetadata = async () => {
  const md: Metadata = {
    title: "Jereko - My personal website | Jesse Koldewijn",
    category: "website",
  };
  return md;
};

const showEventsMessage = cache(() => {
  const showEventsDisabledMessage = [
    "[DEBUG]:",
    "Events are disabled for now.",
    "This is currently turned off in a hardcoded fashion.",
  ];
  return `console.debug('${showEventsDisabledMessage.join(" ")}')`.trim();
});

const Home = async () => {
  const showEvents = false;

  const showEventsScript = showEventsMessage();

  return (
    <>
      <HeroSection
        bannerImage={{
          dark: Avatar,
          light: Avatar,
        }}
        bannerContent={{
          title: "Jereko",
          description: "Hi, My name is Jesse!",
        }}
      />
      <section className="mx-auto flex w-full max-w-lg flex-col items-center gap-8 px-4 pt-0 text-center md:pt-5 lg:pt-10">
        <h2 className="text-md font-semibold md:text-xl">
          Thanks for the visit!
        </h2>
        <p className="text-neutral-600 dark:text-neutral-200">
          This website is used to showcase my projects, experience and
          volunteering work. I also use this website to showcase my skills in
          engineering and events I&apos;ve attended.
        </p>
      </section>
      <section className="mx-auto flex w-full max-w-lg flex-col items-center gap-8 px-4 py-20 text-center">
        <h2 className="text-md font-semibold md:text-xl">
          A short introduction about me
        </h2>
        <IntroSection />
      </section>
      {showEvents && <LatestAttendedWrapperDynamic />}
      {!showEvents && (
        <script
          dangerouslySetInnerHTML={{
            __html: showEventsScript,
          }}
        />
      )}
    </>
  );
};

export default Home;
