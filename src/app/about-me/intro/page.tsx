import { type ServerRuntime } from "next";

export const runtime: ServerRuntime = "edge";

const Introduction = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      Intro...
    </div>
  );
};

export default Introduction;
