// app/blog/[slug]/page.tsx
import { baseUrl } from '@/app/sitemap'
import { notFound } from 'next/navigation'
import { getBlogPosts, formatDate } from '../utils'
import { MDXContent } from '@/components/mdx'
import BackArrow from '@/components/back-arrow'

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = getBlogPosts().find((p) => p.slug === slug)
  if (!post) return {}

  const { title, publishedAt: publishedTime, summary: description, image } = post.metadata
  const ogImage = image ?? `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  }
}

export default async function Blog(
  { params }: Readonly<{ params: Promise<{ slug: string }> }>
) {
  const { slug } = await params
  const post = getBlogPosts().find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <section className="max-w-4xl mx-auto px-8 text-lg leading-relaxed">
      <BackArrow className="mb-6" fallbackHref="/blog" label="Back to posts" />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: { '@type': 'Person', name: 'Vin Jones Portfolio' },
          }),
        }}
      />
      <h1 className="title font-semibold text-3xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>

      {/* Formatting lives here */}
      <article className="prose prose-zinc dark:prose-invert max-w-none">
        <MDXContent source={post.content} />
      </article>
    </section>
  )
}
