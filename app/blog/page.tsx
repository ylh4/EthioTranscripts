import Link from "next/link"
import { format } from "date-fns"
import { getStaticPosts } from "@/lib/blog/static-data"

export const revalidate = 3600 // Revalidate every hour

export default async function BlogPage() {
  const posts = await getStaticPosts()

  return (
    <div className="space-y-4 sm:space-y-8">
      {posts?.map((post) => (
        <article
          key={post.id}
          className="group relative flex flex-col space-y-3 sm:space-y-4 bg-card p-4 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <Link
            href={`/blog/${post.slug}`}
            className="hover:underline text-[#1B4332]"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-center">
              {post.title}
            </h2>
          </Link>
          <p className="text-sm sm:text-base text-muted-foreground text-left sm:text-justify leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-muted-foreground">
            <time dateTime={post.published_at}>
              {format(new Date(post.published_at), "MMMM d, yyyy")}
            </time>
            {post.categories?.length > 0 && (
              <div className="flex items-center space-x-1">
                <span className="hidden sm:inline">•</span>
                <div className="flex flex-wrap justify-center items-center gap-1">
                  {post.categories.map(({ category }, index) => (
                    <span key={category.id}>
                      {category.name}
                      {index < post.categories.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>
            )}
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