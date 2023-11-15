import HeroSection from "@/components/layout/sections/HeroSection";
import Avatar from "@/images/avatar.webp";

export const runtime = "edge"; // edge runtime

const Volunteering = () => {
  return (
    <div className="flex flex-col">
      <HeroSection
        bannerImage={{
          dark: Avatar,
          light: Avatar,
        }}
        bannerContent={{
          title: "Volunteering",
          description: "About my volunteering experience. So what do I do?",
        }}
      />
    </div>
  );
};

export default Volunteering;
