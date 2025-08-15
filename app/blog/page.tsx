import { BlogPosts } from "@/components/posts";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section className="max-w-4xl mx-auto px-8 text-lg leading-relaxed">
      <h1 className="font-semibold text-3xl mb-8 tracking-tighter">
        Blog Posts
      </h1>
      <BlogPosts />
    </section>
  );
}
