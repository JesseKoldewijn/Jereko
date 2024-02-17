import type { Metadata, ServerRuntime } from "next";
import { Suspense } from "react";

import type { Revalidate } from "next/dist/server/lib/revalidate";

import HeroSection from "@/components/layout/sections/HeroSection";
import BlogLister from "@/components/listers/BlogLister";
import Avatar from "@/images/avatar.webp";

export const runtime: ServerRuntime = "edge"; // edge runtime for faster startup time
export const revalidate: Revalidate = 172800000; // 2 days in ms

export const metadata: Metadata = {
  title: "Blog",
  description: "An overview of my blog posts.",
  openGraph: {
    title: "Blog | Jereko",
    description: "An overview of my blog posts.",
    url: "https://jereko.dev",
  },
};

const BlogPage = async () => {
  return (
    <>
      <HeroSection
        bannerImage={{
          dark: Avatar,
          light: Avatar,
        }}
        bannerContent={{
          title: "Blog",
          description: "Read more about my experiences & thoughts here.",
        }}
      />
      <section className="mx-auto flex w-full max-w-lg flex-col items-center text-center">
        <Suspense fallback={<p>Loading...</p>}>
          <BlogLister />
        </Suspense>
      </section>
    </>
  );
};

export default BlogPage;
