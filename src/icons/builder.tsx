import type { JSX } from "react";

import type { CommonSvgAttributes } from "./common";

type LucideIcon = (props: CommonSvgAttributes) => JSX.Element;

export const buildLucideIcon = (name: string, svgContent: JSX.Element) => {
  const component = (props: CommonSvgAttributes) => {
    const defaults = {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    } as const;

    const _props = {
      ...defaults,
      ...props,
    };

    return <svg {..._props}>{svgContent}</svg>;
  };
  component.displayName = name;

  return component as LucideIcon;
};
