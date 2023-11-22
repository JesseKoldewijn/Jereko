import AboutMeHeader from "@/components/page-elements/about-me/page-heading";

const AboutMeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AboutMeHeader />
      {children}
    </>
  );
};

export default AboutMeLayout;
