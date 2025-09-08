import { getBlogPosts, formatDate } from '@/app/blog/utils'
import Link from 'next/link'

export function BlogPosts() {
  const allBlogs = getBlogPosts()

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex flex-col space-y-1 mb-4 group"
          >
            <div className="w-full flex flex-col md:flex-row gap-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[200px] tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight group-hover:underline">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}
