import type { Metadata } from "next";
import { Suspense } from "react";

import type { Revalidate } from "next/dist/server/lib/revalidate";
import dynamic from "next/dynamic";

import { RefreshingList } from "@/components/listers/refreshing/Root";
import Avatar from "@/images/avatar.webp";
import { getAllWpPosts } from "@/server/actions/wp-fetch";

const HeroSection = dynamic(
  () => import("@/components/layout/sections/HeroSection"),
  {
    ssr: true,
  },
);

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
        <Suspense>
          <RefreshingList
            actionFunction={getAllWpPosts}
            listerItemName="blog"
            queryKey={["blog"]}
            showRefrashedAt={true}
            emptyListMessage="No blog posts found."
            className="w-full"
            ssr
          />
        </Suspense>
      </section>
    </>
  );
};

export default BlogPage;
