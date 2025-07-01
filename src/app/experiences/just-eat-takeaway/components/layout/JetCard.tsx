"use client";

import "@justeattakeaway/pie-css";

import dynamic from "next/dynamic";

const isDev = process.env.NODE_ENV === "development";
const PieCard = dynamic(
  () =>
    import("@justeattakeaway/pie-webc/react/card.js").then(
      (mod) => mod.PieCard,
    ),
  { ssr: !isDev },
);

type PieCardProps = React.ComponentProps<typeof PieCard>;
interface JetCardProps extends PieCardProps {
  children?: React.ReactNode;
}

const JetCard = ({ children, ...rest }: JetCardProps) => {
  return <PieCard {...rest}>{children}</PieCard>;
};

export default JetCard;
