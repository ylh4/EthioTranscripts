import Link from "next/link"
import { format } from "date-fns"
import { getStaticPosts } from "@/lib/blog/static-data"

export const revalidate = 60 // Revalidate every minute instead of every hour

export default async function BlogPage() {
  const posts = await getStaticPosts()
  const renderTime = new Date().toISOString()

  return (
    <div className="grid gap-4 sm:gap-6 auto-rows-auto mt-4">
      <div className="text-xs text-muted-foreground mb-4">
        Last rendered: {renderTime}
      </div>
      {posts?.map((post) => (
        <article
          key={post.id}
          className="bg-card p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="space-y-3 sm:space-y-4">
            <Link
              href={`/blog/${post.slug}`}
              className="block hover:underline text-[#1B4332]"
            >
              <h2 className="text-lg sm:text-xl font-bold">
                {post.title}
              </h2>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <time dateTime={post.published_at}>
                {format(new Date(post.published_at), "MMM d, yyyy")}
              </time>
            </div>
          </div>
        </article>
      ))}

      {(!posts || posts.length === 0) && (
        <div className="text-center text-muted-foreground">
          No blog posts found.
        </div>
      )}
    </div>
  )
} 