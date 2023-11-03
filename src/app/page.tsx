import { type Metadata } from "next";

import HeroSection from "@/components/layout/sections/HeroSection";
import Avatar from "@/images/avatar.webp";

export const revalidate = 86400;

export const metadata: Metadata = {
  openGraph: {
    title: "JKinsight",
    description: "My personal website.",
    url: "https://jkinsight.vercel.app",
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
          title: "JKinsight",
          description: "My personal website.",
        }}
      />
      <div className="mt-8 w-auto max-w-md px-4 md:mx-auto md:w-full md:px-0">
        <section>Home page</section>
      </div>
    </>
  );
};

export default Home;
