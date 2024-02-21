"use server";

import { type PostsParams, fetchWP } from "../wp-api";

export const getAllWpPosts = async () => {
  const wpPostsParams = {
    status: ["publish"],
  } satisfies PostsParams;

  const WpPosts = await fetchWP("/posts", wpPostsParams, {
    next: {
      tags: ["blog-lister"],
    },
  });

  return WpPosts;
};
