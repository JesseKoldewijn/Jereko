import React from "react";

import AboutMeHeader from "@/components/page-elements/about-me/page-heading";

const AboutMeLayout = ({
  route,
}: {
  children: React.ReactNode;
  route: React.ReactNode;
}) => {
  return (
    <>
      <AboutMeHeader />
      <div className="mx-4 flex flex-col items-center justify-center gap-8 lg:mx-2 lg:flex-row">
        {route}
      </div>
    </>
  );
};

export default AboutMeLayout;
