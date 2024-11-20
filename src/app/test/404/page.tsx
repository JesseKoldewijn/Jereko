import { notFound } from "next/navigation";

import { env } from "@/env";

const NotFoundPage = async () => {
  const isProd = env.NODE_ENV === "production";

  if (isProd) {
    notFound();
  }

  return <div>NotFoundPage</div>;
};

export default NotFoundPage;
