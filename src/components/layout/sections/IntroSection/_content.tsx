"use client";

import AnimatedGradientText from "@/components/animated/animated-grad-text";
import type { Experience } from "@/server/db/schemas/experience";

export const AnimatedIntroSection1 = () => (
  <AnimatedGradientText
    className="font-bold"
    variant="span"
    text="Jesse Koldewijn"
  />
);

export const AnimatedIntroSection2 = ({
  latestExperience,
}: {
  latestExperience: Experience;
}) => (
  <AnimatedGradientText
    variant="span"
    className="px-1 font-bold"
    text={latestExperience?.company_name ?? ""}
  />
);

export const AnimatedIntroSection3 = ({
  latestExperience,
}: {
  latestExperience: Experience;
}) => (
  <AnimatedGradientText
    variant="span"
    className="font-bold [background-size:105%]"
    text={latestExperience?.title ?? ""}
  />
);
