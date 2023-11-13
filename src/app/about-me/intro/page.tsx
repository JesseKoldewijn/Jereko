import HeroSection from "@/components/layout/sections/HeroSection";
import Avatar from "@/images/avatar.webp";

const Introduction = () => {
  return (
    <div className="flex flex-col">
      <HeroSection
        bannerImage={{
          dark: Avatar,
          light: Avatar,
        }}
        bannerContent={{
          title: "Introduction",
          description: "Who am I and what do I do?",
        }}
      />
    </div>
  );
};

export default Introduction;
