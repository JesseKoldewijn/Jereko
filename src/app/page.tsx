import type { Metadata } from "next";
import { Suspense } from "react";

import type { Revalidate } from "next/dist/server/lib/revalidate";
import dynamic from "next/dynamic";

import EventItem from "@/components/events/event-item";
import IntroSection from "@/components/layout/sections/IntroSection";
import Avatar from "@/images/avatar.webp";

const LatestAttendedEventLazy = dynamic(
  () => import("@/components/events/last-attended"),
  {
    ssr: false,
    loading: () => (
      <>
        <div className="mx-auto mt-8 w-full max-w-md px-4 md:px-0">
          <section
            id="last-event"
            className="my-4 flex flex-col gap-4 text-center"
          >
            <EventItem title="Latest Attended Event" isSkeleton />
          </section>
        </div>
      </>
    ),
  },
);

const HeroSection = dynamic(
  () => import("@/components/layout/sections/HeroSection"),
  {
    ssr: true,
  },
);

export const revalidate: Revalidate = 172800000; // 2 days in ms

export const metadata: Metadata = {
  title: "Jereko - My personal website | Jesse Koldewijn",
  description:
    "My personal website. This website is used to showcase my projects, experience and volunteering. I also use this website to showcase my skills in web development, events I've attended and possibly also a dev blog in the future.",
  openGraph: {
    title: "Jereko",
    description: "My personal website.",
    url: "https://jereko.dev",
  },
};

const Home = async () => {
  return (
    <>
      <HeroSection
        bannerImage={{
          dark: Avatar,
          light: Avatar,
        }}
        bannerContent={{
          title: "Jereko",
          description: "My personal website.",
        }}
      />
      <section className="mx-auto flex w-full max-w-lg flex-col items-center gap-8 px-4 pt-0 text-center md:pt-5 lg:pt-10">
        <h2 className="text-md font-semibold md:text-xl">
          Thanks for visiting my personal website!
        </h2>
        <p className="text-neutral-600 dark:text-neutral-200">
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
      <section className="mx-auto flex w-full max-w-lg flex-col items-center text-center">
        <h3 className="text-md px-2 font-semibold md:text-xl">
          Speaking about events I&apos;ve attended...
        </h3>
        <p className="mt-4 px-2 text-neutral-600 dark:text-neutral-200">
          Down below is the latest event I&apos;ve attended
        </p>
        <Suspense>
          <LatestAttendedEventLazy />
        </Suspense>
      </section>
    </>
  );
};

export default Home;
