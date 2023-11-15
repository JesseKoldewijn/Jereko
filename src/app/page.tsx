import { type Metadata } from "next";
import { Suspense } from "react";

import dynamic from "next/dynamic";

import LastAttendedEvent from "@/components/events/last-attended";
import Avatar from "@/images/avatar.webp";
import { getAgeByDateString } from "@/lib/age";
import { animatedGradient } from "@/lib/prog-classes";
import { cn } from "@/lib/utils";
import { mostRecentExp } from "@/server/handlers/exp/getLatest";

const HeroSection = dynamic(
  () => import("@/components/layout/sections/HeroSection"),
  {
    ssr: true,
  },
);

export const revalidate = 86400; // 24 hours

export const metadata: Metadata = {
  openGraph: {
    title: "JKinsight",
    description: "My personal website.",
    url: "https://jkinsight.vercel.app",
  },
};

const Home = async () => {
  const IntroSection = async () => {
    const myAge = getAgeByDateString("1999-02-15");
    const latestExperience = await mostRecentExp();

    return (
      <p className="text-neutral-600 dark:text-neutral-400">
        My name is{" "}
        <span className={cn(animatedGradient, "font-bold")}>
          Jesse Koldewijn
        </span>
        , I&apos;m a {myAge} year old gamer, software engineer and tech
        enthusiast. I&apos;m currently working at
        <span className={cn(animatedGradient, "font-bold")}>
          {` ${latestExperience?.company_name} `}
        </span>
        as a
        <span className={cn(animatedGradient, "font-bold")}>
          {` ${latestExperience?.title}`}.
        </span>
      </p>
    );
  };

  return (
    <>
      <HeroSection
        bannerImage={{
          dark: Avatar,
          light: Avatar,
        }}
        bannerContent={{
          title: "JKinsight",
          description: "My personal website.",
        }}
      />
      <section className="mx-auto flex w-full max-w-lg flex-col items-center gap-8 px-4 pt-5 text-center md:pt-20">
        <h2 className="text-md font-semibold md:text-xl">
          Thanks for visiting my personal website!
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          This website is used to showcase my projects, experience and
          volunteering. I also use this website to showcase my skills in web
          development, events I&apos;ve attended and possibly also a dev blog in
          the future.
        </p>
      </section>
      <section className="mx-auto flex w-full max-w-lg flex-col items-center gap-8 px-4 py-20 text-center">
        <h2 className="text-md font-semibold md:text-xl">
          A short introduction about me
        </h2>
        <Suspense>
          <IntroSection />
        </Suspense>
      </section>
      <section className="mx-auto flex w-full max-w-lg flex-col items-center pb-20 text-center">
        <h3 className="text-md font-semibold md:text-xl">
          Speaking about events I&apos;ve attended...
        </h3>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          Down below is the latest event I&apos;ve attended
        </p>
        <LastAttendedEvent />
      </section>
    </>
  );
};

export default Home;
