import { BlogPosts } from "@/components/posts";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-4">
      <span className="mb-4 block font-mono text-xs tracking-widest text-[#a5e446] uppercase">
        Writing
      </span>
      <h1 className="mb-10 text-4xl font-semibold tracking-tight text-white">
        Blog Posts
      </h1>
      <BlogPosts />
    </section>
  );
}
