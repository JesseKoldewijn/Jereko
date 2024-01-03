import React from "react";

import AboutMeHeader from "@/components/page-elements/about-me/page-heading";

const AboutMeLayout = ({
  routes,
}: {
  children: React.ReactNode;
  routes: React.ReactNode;
}) => {
  return (
    <>
      <AboutMeHeader />
      <div className="mx-4 flex flex-col items-center justify-center gap-8 lg:mx-2 lg:flex-row">
        {routes}
      </div>
    </>
  );
};

export default AboutMeLayout;
