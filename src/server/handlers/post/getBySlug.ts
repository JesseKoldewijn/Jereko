import { type PostsParams, fetchWP } from "@/server/wp-api";
import { parseHtml } from "@/utils/htmlParser";

export const getPostBySlug = async (slug: string[]) => {
  const wpPostsParams = {
    status: ["publish"],
    slug: Array.isArray(slug) ? slug : Array(slug),
  } satisfies PostsParams;

  const WpPosts = await fetchWP("/posts", wpPostsParams);

  if (!WpPosts) return null;
  else {
    const post = WpPosts.find((post) => post.slug === slug[0]);

    const postTitle = parseHtml(post.title.rendered).text;
    const postContent = parseHtml(post.content.rendered).text;

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
