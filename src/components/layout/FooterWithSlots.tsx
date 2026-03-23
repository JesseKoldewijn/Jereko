"use client";

import { usedTechnologies } from "@/config/tech";
import { type Socials } from "@/data/socials";

import Footer from "./footer";
import QuadSection from "./footer/quad-section";
import TechUsedSectionNew from "./footer/tech-used";

export default function FooterWithSlots({
  socials,
}: {
  socials: Socials | null;
}) {
  return (
    <Footer
      topSlot={<TechUsedSectionNew techUsed={usedTechnologies} />}
      innerSlot={<QuadSection />}
      socials={socials}
    />
  );
}
