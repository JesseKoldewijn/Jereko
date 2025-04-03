import AboutMeHeader from "@/components/page-elements/about-me/page-heading";

const AboutMeLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AboutMeHeader />
      <div className="mx-4 flex flex-col items-center justify-center gap-8 lg:mx-2 lg:flex-row">
        {children}
      </div>
    </>
  );
};

export default AboutMeLayout;
