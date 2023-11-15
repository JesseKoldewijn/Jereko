import HeroSection from "@/components/layout/sections/HeroSection";
import Avatar from "@/images/avatar.webp";

export const runtime = "edge"; // edge runtime

const Hobbies = () => {
  return (
    <div className="flex flex-col">
      <HeroSection
        bannerImage={{
          dark: Avatar,
          light: Avatar,
        }}
        bannerContent={{
          title: "Hobbies",
          description: "What do I do in my spare time?",
        }}
      />
    </div>
  );
};

export default Hobbies;
