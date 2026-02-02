import { getBlogPosts, formatDate } from "@/app/blog/utils";
import { PostListItem } from "./post-list-item";

export function BlogPosts() {
  const allBlogs = getBlogPosts().filter((post) => !post.isNested);

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <PostListItem
            key={post.slug}
            slug={post.slug}
            href={`/blog/${post.slug}`}
            dateLabel={formatDate(post.metadata.publishedAt, false)}
            title={post.metadata.title}
          />
        ))}
    </div>
  );
}
