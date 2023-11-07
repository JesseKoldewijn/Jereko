import React from "react";

import dynamic from "next/dynamic";

import Avatar from "@/images/avatar.webp";

const HeroSection = dynamic(
  () => import("@/components/layout/sections/HeroSection"),
  {
    ssr: true,
  },
);

const Hobbies = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <HeroSection
        bannerImage={{
          dark: Avatar,
          light: Avatar,
        }}
        bannerContent={{
          title: "About Me",
          description: "Who am I? And what do I do?",
        }}
      />
    </div>
  );
};

export default Hobbies;
