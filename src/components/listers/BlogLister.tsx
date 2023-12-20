import { type PostsParams, fetchWP } from "@/server/wp-api";

import BlogListerItem from "./BlogListerItem";

const BlogLister = async () => {
  const wpPostsParams = {
    status: ["publish"],
  } satisfies PostsParams;

  const WpPosts = await fetchWP("/posts", wpPostsParams, {
    next: {
      tags: ["blog-lister"],
    },
  });

  return (
    <div className="flex flex-col gap-4 px-4">
      {WpPosts && WpPosts.length > 0 ? (
        <>
          {WpPosts.flatMap((post) => {
            return (
              <div key={post.id}>
                <BlogListerItem blog={post} />
              </div>
            );
          })}
        </>
      ) : (
        <>No blog posts found</>
      )}
    </div>
  );
};

export default BlogLister;
