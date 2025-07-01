import "@justeattakeaway/pie-css";

import localFont from "next/font/local";

import { cn } from "@/lib/utils";

import "./styles/fonts.css";
import "./styles/theme.css";

const jetSansDigitalBase = localFont({
  src: [
    {
      path: "./fonts/base-subset/JETSansDigital-Regular-optimised.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/base-subset/JETSansDigital-Regular-optimised.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/base-subset/JETSansDigital-Bold-optimised.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/base-subset/JETSansDigital-Bold-optimised.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/base-subset/JETSansDigital-ExtraBold-optimised.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/base-subset/JETSansDigital-ExtraBold-optimised.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-jet-sans-digital-regular",
});

const jetSansDigitalExtended = localFont({
  src: [
    {
      path: "./fonts/extended-subset/JETSansDigital-Regular-optimised-extended.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/extended-subset/JETSansDigital-Regular-optimised-extended.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/extended-subset/JETSansDigital-Bold-optimised-extended.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/extended-subset/JETSansDigital-Bold-optimised-extended.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/extended-subset/JETSansDigital-ExtraBold-optimised-extended.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/extended-subset/JETSansDigital-ExtraBold-optimised-extended.woff",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-jet-sans-digital-extended",
});

const JustEatTakeawayJobPageLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        jetSansDigitalBase.variable,
        jetSansDigitalExtended.variable,
      )}
      data-theme="just-eat-takeaway"
    >
      <div className="jet-bg pointer-events-none fixed inset-0 -z-[1] h-screen w-screen"></div>
      {children}
    </div>
  );
};

export default JustEatTakeawayJobPageLayout;
