"use client";

import {
  type DefaultProps,
  PieSpinner as Spinner,
  defaultProps,
} from "@justeattakeaway/pie-webc/react/spinner.js";

import { cn } from "@/lib/utils";

import type { JetCommonComponentProps } from "../common-component";
import "../pie-common.css";

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
