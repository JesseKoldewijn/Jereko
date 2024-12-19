"use client";

import dynamic from "next/dynamic";

import {
  type DefaultProps,
  defaultProps,
} from "@justeattakeaway/pie-webc/react/spinner.js";

import { cn } from "@/lib/utils";

import type { JetCommonComponentProps } from "../common-component";

const Spinner = dynamic(
  () =>
    import("@justeattakeaway/pie-webc/react/spinner.js").then(
      (mod) => mod.PieSpinner,
    ),
  {
    ssr: false,
  },
);

export const JetLoadingSpinner = (
  props: JetCommonComponentProps<HTMLDivElement> & {
    pieProps?: DefaultProps;
    isSpinning?: boolean;
    isShowing?: boolean;
  },
) => {
  const { className, isShowing, isSpinning, pieProps, ...rest } = props;
  const pieProperties = { ...defaultProps, ...pieProps };

  return (
    <Spinner
      className={cn(className, {
        hidden: isShowing,
        "animate-spin duration-500 ease-in-out": isSpinning,
      })}
      {...pieProperties}
      {...rest}
    />
  );
};
