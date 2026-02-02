import { MDXContent } from "@/components/mdx";
import { getBlogPosts } from "@/app/blog/utils";

type StoryChaptersProps = {
  slugs: string[];
};

export function StoryChapters({ slugs }: Readonly<StoryChaptersProps>) {
  const posts = getBlogPosts();
  const postsBySlug = new Map(posts.map((post) => [post.slug, post]));

  return (
    <div className="space-y-16">
      {slugs.map((slug) => {
        const post = postsBySlug.get(slug);
        if (!post) {
          return null;
        }

        return (
          <section key={slug} className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">
              {post.metadata.title}
            </h2>
            <MDXContent source={post.content} />
          </section>
        );
      })}
    </div>
  );
}
