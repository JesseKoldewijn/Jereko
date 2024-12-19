"use client";

import { usePathname } from "next/navigation";

import { useEffect, useRef } from "react";

import { TextGen } from "@/components/animated/text-gen-dynamic";
import { JetLoadingSpinner } from "@/components/just-eat-takeaway/utils/spinner";

const JetJobPageLoader = ({ content }: { content: React.ReactNode }) => {
  const pathName = usePathname();
  const loadingContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref = loadingContainerRef.current;
    if (!ref) return;
    const timeout = setTimeout(() => {
      ref.animate(
        [
          {
            opacity: 1,
          },
          {
            opacity: 0,
          },
        ],
        {
          duration: 1000,
          easing: "ease-in-out",
          fill: "forwards",
        },
      );
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName, loadingContainerRef.current]);

  return (
    <>
      {content}
      <div
        ref={loadingContainerRef}
        className="absolute inset-0 top-10 flex min-h-[80svh] flex-col items-center justify-center bg-background opacity-100 md:min-h-[90svh]"
      >
        <JetLoadingSpinner
          pieProps={{
            variant: "brand",
            size: "large",
          }}
        />
        <div className="mt-10 flex flex-col gap-0 text-center text-lg font-medium md:mt-8 md:flex-row md:gap-1">
          Did somebody say,
          <TextGen
            words={"Just Eat Takeaway?"}
            className="inline-block"
            childClassName="text-lg flex flex-col md:flex-row md:gap-2 mt-0"
          />
        </div>
      </div>
    </>
  );
};

export default JetJobPageLoader;
