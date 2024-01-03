import parse from "node-html-parser";

import { type PostsParams, fetchWP } from "@/server/wp-api";

export const getPostBySlug = async (slug: string[]) => {
  const wpPostsParams = {
    status: ["publish"],
    slug: Array.isArray(slug) ? slug : Array(slug),
  } satisfies PostsParams;

  const WpPosts = await fetchWP("/posts", wpPostsParams);

  if (!WpPosts) return null;
  else {
    const post = WpPosts.find((post) => post.slug === slug[0]);

    const postTitle = String(parse(post.title.rendered));
    const postContent = String(parse(post.content.rendered));

    const prettyTitle =
      postTitle.length > 20 ? postTitle.slice(0, 60) + "..." : postTitle;
    const prettyContent =
      postContent.length > 60 ? postContent.slice(0, 60) + "..." : postContent;

    return {
      prettyTitle,
      prettyContentShort: prettyContent,
      data: post,
    };
  }
};
