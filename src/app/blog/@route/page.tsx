import { type Metadata } from "next";
import { Suspense } from "react";

import HeroSection from "@/components/layout/sections/HeroSection";
import BlogLister from "@/components/listers/BlogLister";
import Avatar from "@/images/avatar.webp";

export const revalidate = 3600; // revalidate at most every hour

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
