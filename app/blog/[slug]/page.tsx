import { format } from "date-fns"
import { notFound } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { getStaticPostBySlug, getStaticPosts } from "@/lib/blog/static-data"
import { Markdown } from "@/components/ui/markdown"

export const revalidate = 3600 // Revalidate every hour

export async function generateStaticParams() {
  const posts = await getStaticPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getStaticPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <PageHeader
        heading={post.title}
        text={post.excerpt}
      />

      <div className="mt-8">
        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground mb-8">
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

        <article className="prose prose-green mx-auto">
          <Markdown content={post.content} />
        </article>
      </div>
    </>
  )
} 