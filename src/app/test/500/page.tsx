import { notFound } from "next/navigation";

import { env } from "@/env";

const ServerErrorPage = async () => {
  const isProd = env.NODE_ENV === "production";

  if (isProd) {
    notFound();
  }

  throw new Error("Server Error");
};

export default ServerErrorPage;
