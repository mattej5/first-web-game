import { BlogPosts } from "@/components/posts";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section className="mx-auto max-w-4xl px-8 text-lg leading-relaxed">
      <h1 className="mb-8 text-3xl font-semibold tracking-tighter">
        Blog Posts
      </h1>
      <BlogPosts />
    </section>
  );
}
