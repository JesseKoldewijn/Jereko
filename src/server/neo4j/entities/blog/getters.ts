import { QueryBuilder } from "neogma";
import { cache as dedupe } from "react";

import { unstable_cache } from "next/cache";

import { neo_namespaces } from "@/server/neo4j/namespaces";
import { neo } from "@/server/neo4j/root";

import type { BlogPost } from "./root";

/**
 * The `internal_getAllPosts` constant is a function that fetches all blog posts
 * from a Neo4j database using a QueryBuilder to construct a query.
 */
const internal_getAllPosts = dedupe(async () => {
  const namespace = neo_namespaces.posts;
  const qb = new QueryBuilder().match({
    literal: `(${namespace})`,
    optional: false,
  });
  const results = await neo.queryRunner.run(qb.getStatement());

  const posts = results.records
    .map((record) => {
      const post = record.get(namespace).properties;

      if (!post) return undefined;

      return {
        title: post.title,
        slug: post.slug,
        content: post.content,
        publishedAt: post.publishedAt,
        updatedAt: post.updatedAt,
      } as BlogPost;
    })
    .filter((x) => x !== undefined);

  if (!posts || posts.length === 0) return null;
  return posts;
});

export const getAllBlogPosts = unstable_cache(
  internal_getAllPosts,
  ["getAllBlogPosts"],
  {
    // revalidate every 24 hours
    revalidate: 24 * 60 * 60 * 1000,
  },
);
