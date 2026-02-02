// app/blog/[slug]/page.tsx
import { baseUrl } from "@/app/sitemap";
import { notFound } from "next/navigation";
import { getBlogPosts, formatDate } from "../utils";
import { MDXContent } from "@/components/mdx";
import BackArrow from "@/components/back-arrow";
import { TableOfContents } from "@/components/table-of-contents";
import { PasswordGate } from "@/components/password-gate";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPosts().find((p) => p.slug === slug);
  if (!post) return {};

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image ?? `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;
  const post = getBlogPosts().find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <section className="-m-6 mx-auto min-h-full max-w-4xl rounded-2xl bg-black p-6 px-8 text-lg leading-relaxed md:-m-8 md:p-8">
      <BackArrow className="mb-6" fallbackHref="/blog" label="Back to posts" />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: { "@type": "Person", name: "Vin Jones Portfolio" },
          }),
        }}
      />
      <h1 className="title text-3xl font-semibold tracking-tighter text-white">
        {post.metadata.title}
      </h1>
      <div className="mt-2 mb-8 flex items-center justify-between text-sm">
        <p className="text-sm text-gray-300">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>

      {/* Formatting lives here */}
      <PasswordGate
        isProtected={Boolean(post.metadata.passwordProtected)}
        password={post.metadata.password}
        contactEmail={post.metadata.passwordContactEmail}
        passwordHint={post.metadata.passwordHint}
        storageKey={`blog:${post.slug}`}
        title={post.metadata.title}
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_250px]">
          <article className="prose prose-invert prose-headings:text-white prose-p:text-gray-100 prose-li:text-gray-100 prose-strong:text-white prose-code:text-gray-100 prose-a:text-blue-400 max-w-none">
            <MDXContent source={post.content} />
          </article>

          <aside className="hidden lg:block">
            <TableOfContents />
          </aside>
        </div>
      </PasswordGate>
    </section>
  );
}
