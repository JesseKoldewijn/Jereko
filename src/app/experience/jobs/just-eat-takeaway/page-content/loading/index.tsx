"use client";

import { TextGen } from "@/components/animated/text-gen-dynamic";
import { JetLoadingSpinner } from "@/components/just-eat-takeaway/utils/spinner";

const JetJobPageLoader = () => {
  return (
    <div className="inset-0 flex min-h-[80svh] flex-col items-center justify-center md:min-h-[90svh]">
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
  );
};

export default JetJobPageLoader;
