import { Metadata } from "next"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"
import { format } from "date-fns"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Blog",
  description: "Read our latest blog posts",
}

export default async function BlogPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: posts } = await supabase
    .from("blog_posts")
    .select(`
      *,
      categories:blog_posts_categories(
        category:blog_categories(*)
      )
    `)
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })

  return (
    <div className="container py-8">
      <PageHeader
        heading="Blog"
        text="Read our latest blog posts and stay updated"
      />

      <div className="mt-8 max-w-4xl mx-auto">
        <div className="space-y-12">
          {posts?.map((post) => (
            <article
              key={post.id}
              className="group relative flex flex-col space-y-4 bg-card p-6 rounded-lg shadow-sm"
            >
              <h2 className="text-2xl font-bold text-center">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-muted-foreground text-justify">{post.excerpt}</p>
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <time dateTime={post.published_at}>
                  {format(new Date(post.published_at), "MMMM d, yyyy")}
                </time>
                {post.categories?.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <span>•</span>
                    <div className="flex items-center space-x-1">
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
        </div>

        {(!posts || posts.length === 0) && (
          <div className="mt-8 text-center text-muted-foreground">
            No blog posts found.
          </div>
        )}
      </div>
    </div>
  )
} 