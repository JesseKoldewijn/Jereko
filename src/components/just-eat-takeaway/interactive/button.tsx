"use client";

import dynamic from "next/dynamic";

import type { CardProps } from "@justeattakeaway/pie-webc/react/card.js";
import {
  type DefaultProps,
  defaultProps,
} from "@justeattakeaway/pie-webc/react/card.js";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const Card = dynamic(
  () =>
    import("@justeattakeaway/pie-webc/react/card.js").then(
      (mod) => mod.PieCard,
    ),
  {
    ssr: false,
  },
);

export const JetCard = (
  props: CardProps &
    AnchorHTMLAttributes<HTMLAnchorElement> &
    ButtonHTMLAttributes<HTMLButtonElement> & {
      pieProps?: DefaultProps;
      isSpinning?: boolean;
      isShowing?: boolean;
    },
) => {
  const { className, isShowing, isSpinning, pieProps, ...rest } = props;
  const pieProperties = { ...defaultProps, ...pieProps };

  return (
    <Card
      className={cn(className, {
        hidden: isShowing,
        "animate-spin duration-500 ease-in-out": isSpinning,
      })}
      {...pieProperties}
      {...rest}
    />
  );
};
