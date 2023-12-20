import { type Metadata } from "next";
import { Suspense } from "react";

import HeroSection from "@/components/layout/sections/HeroSection";
import Avatar from "@/images/avatar.webp";
import { type PostsParams, fetchWP } from "@/server/wp-api";
import { parse } from "node-html-parser";
import { notFound } from "next/navigation";


export type BlogPageArgs = {
  params: {
    slug: string[];
  };
};

const getPostBySlug = async (slug: string) => {
  const wpPostsParams = {
    status: ["publish"],
    slug: [slug],
  } satisfies PostsParams;

  const WpPosts = await fetchWP("/posts", wpPostsParams);

  if (!WpPosts) return null;
  else {
    const post = WpPosts[0];

  const postTitle =  String(parse(post.title.rendered));
  const postContent = String(parse(post.content.rendered));

  const prettyTitle = postTitle.length > 20 ? postTitle.slice(0, 60) + "..." : postTitle;
  const prettyContent = postContent.length > 60 ? postContent.slice(0, 60) + "..." : postContent;

  return {
    prettyTitle,
    prettyContentShort: prettyContent,
    data: post
  }
  }

};

export const generateMetadata = async ({ params: { slug } }: BlogPageArgs) => {
  const wpPost = await getPostBySlug(Array(slug).join("/") || "");

  if (!wpPost) return {
    title: "Blog",
    description: "An overview of my blog posts.",
    openGraph: {
      title: "Blog | JKinsight",
      description: "An overview of my blog posts.",
      url: "https://jkinsight.nl",
    },
  } satisfies Metadata

  const post = wpPost.data;

  const postTitle =  String(parse(post.title.rendered).text);
  const postContent = String(parse(post.content.rendered).text);

  const prettyTitle = postTitle.length > 20 ? postTitle.slice(0, 60) + "..." : postTitle;
  const prettyContent = postContent.length > 60 ? postContent.slice(0, 60) + "..." : postContent;

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
  const post = await getPostBySlug(Array(slug).join("/") || "");
  
  if (!post) {
    notFound();
  }

  const postDescWithoutHtml = parse(post.prettyContentShort).text;

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
      <section className="mx-auto flex w-full max-w-lg flex-col items-center text-center">
        <Suspense fallback={<p>Loading...</p>}>
          {JSON.stringify(post.data, null, 2)}
        </Suspense>
      </section>
    </>
  );
};

export default BlogPage;
