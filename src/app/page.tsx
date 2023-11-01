import { type ServerRuntime } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export const runtime: ServerRuntime = "edge";

const Home = () => {
  return (
    <main>
      <div className="flex h-full w-full flex-1 flex-col items-center">
        <Card className="w-full max-w-md p-5">
          <CardTitle>Home</CardTitle>
          <CardDescription>Description</CardDescription>
          <CardContent className="pt-4">Content</CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Home;
