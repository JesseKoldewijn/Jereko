import { type ServerRuntime } from "next";

export const runtime: ServerRuntime = "edge";

const Home = () => {
  return (
    <main>
      <div className="flex h-full w-full flex-1 flex-col items-center">
        Welcome to JKinsight!
      </div>
    </main>
  );
};

export default Home;
