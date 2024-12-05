"use client";

import { usePathname } from "next/navigation";

import { useEffect, useLayoutEffect, useState } from "react";

export const CommandMenuOpenButton = (
  props: Omit<React.HTMLAttributes<HTMLParagraphElement>, "children">,
) => {
  const pathName = usePathname();

  const [windowSize, setWindowSize] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const getDeviceType = () => {
    const userAgent = window.navigator.userAgent;
    const mobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      );
    setIsDesktop(!mobile);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize((x) => {
        if (x !== window.innerWidth) {
          return window.innerWidth;
        }
        return x;
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useLayoutEffect(() => {
    getDeviceType();
  }, [pathName, windowSize]);

  return (
    isDesktop && (
      <p {...props}>
        <span className="pointer-events-none inline-flex select-none items-center gap-1">
          Press
        </span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p>
    )
  );
};
