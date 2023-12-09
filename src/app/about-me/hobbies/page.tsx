import { type ServerRuntime } from "next";

export const runtime: ServerRuntime = "edge";

const Hobbies = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      Hobbies...
    </div>
  );
};

export default Hobbies;
