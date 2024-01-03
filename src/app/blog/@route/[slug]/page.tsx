import { type Metadata } from "next";
import { parse } from "node-html-parser";
import { Suspense } from "react";

import Link from "next/link";
import { notFound } from "next/navigation";

import HeroSection from "@/components/layout/sections/HeroSection";
import { Button } from "@/components/ui/button";
import Avatar from "@/images/avatar.webp";
import { getPostBySlug } from "@/server/handlers/post/getBySlug";
import { fetchWP } from "@/server/wp-api";

export type BlogPageArgs = {
  params: {
    slug: string[];
  };
};

export const revalidate = 3600; // revalidate at most every hour
export const dynamicParams = true; // enable dynamic params gen if not generated on build time

export async function generateStaticParams() {
  const wpPosts = await fetchWP("/posts");

  if (!wpPosts || wpPosts.length == 0) return [];

  return wpPosts.map((post) => ({
    slug: post.slug,
  }));
}

export const generateMetadata = async ({ params: { slug } }: BlogPageArgs) => {
  const wpPost = await getPostBySlug(Array.isArray(slug) ? slug : Array(slug));

  if (!wpPost)
    return {
      title: "Blog",
      description: "An overview of my blog posts.",
      openGraph: {
        title: "Blog | JKinsight",
        description: "An overview of my blog posts.",
        url: "https://jkinsight.nl",
      },
    } satisfies Metadata;

  const post = wpPost.data;

  const postTitle = String(parse(post.title.rendered).text);
  const postContent = String(parse(post.content.rendered).text);

  const prettyTitle =
    postTitle.length > 20 ? postTitle.slice(0, 60) + "..." : postTitle;
  const prettyContent =
    postContent.length > 60 ? postContent.slice(0, 60) + "..." : postContent;

  return {
    title: prettyTitle,
    description: prettyContent,
    openGraph: {
      title: `${prettyTitle} | JKinsight`,
      description: prettyContent,
      url: `https://jkinsight.nl/blog/${post.slug}`,
    },
  } satisfies Metadata;
};

const BlogPage = async ({ params: { slug } }: BlogPageArgs) => {
  const post = await getPostBySlug(Array.isArray(slug) ? slug : Array(slug));

  if (!post || post.data.slug !== slug) {
    notFound();
  }

  const postDescWithoutHtml = parse(post.prettyContentShort).text;
  const postContentWithoutHtml = parse(post.data.content.rendered).text;

  return (
    <>
      <HeroSection
        bannerImage={{
          dark: Avatar,
          light: Avatar,
        }}
        bannerContent={{
          title: post.prettyTitle,
          description: postDescWithoutHtml,
        }}
      />
      <section className="mx-auto flex w-full max-w-lg flex-col items-center px-4 text-center md:px-0">
        <Suspense fallback={<p>Loading...</p>}>
          <span className="pb-6 text-neutral-800 dark:text-neutral-200">
            Posted on: {new Date(post.data.date).toLocaleDateString()}
          </span>
          {postContentWithoutHtml}
          <div className="mt-8">
            <Button variant="outline" asChild>
              <Link href="/blog">Back to overview</Link>
            </Button>
          </div>
        </Suspense>
      </section>
    </>
  );
};

export default BlogPage;
