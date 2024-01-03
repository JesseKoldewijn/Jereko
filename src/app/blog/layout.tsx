import { Suspense } from "react";

const BlogLayout = async ({ route }: { route: React.ReactNode }) => {
  return <Suspense>{route}</Suspense>;
};

export default BlogLayout;
