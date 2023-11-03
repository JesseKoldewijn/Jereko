import HeroSection from "@/components/layout/sections/HeroSection";
import BannerProjects from "@/images/banner-programming.webp";

export const revalidate = 86400;

const Home = () => {
  return (
    <>
      <HeroSection
        bannerImage={{
          dark: BannerProjects,
          light: BannerProjects,
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
