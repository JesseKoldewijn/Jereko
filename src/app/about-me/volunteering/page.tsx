import { type ServerRuntime } from "next";

export const runtime: ServerRuntime = "edge";

const Volunteering = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      Volunteering...
    </div>
  );
};

export default Volunteering;
