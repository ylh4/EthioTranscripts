import Link from "next/link"
import { format } from "date-fns"
import { notFound } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { getStaticCategories, getStaticCategoryBySlug, getStaticPostsByCategory } from "@/lib/blog/static-data"

export const revalidate = 3600 // Revalidate every hour

export async function generateStaticParams() {
  const categories = await getStaticCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const category = await getStaticCategoryBySlug(params.slug)

  if (!category) {
    notFound()
  }

  const posts = await getStaticPostsByCategory(category.id)

  return (
    <>
      <PageHeader
        heading={category.name}
        text={`Browse all posts in ${category.name}`}
      />

      <div className="mt-8">
        <div className="space-y-8">
          {posts?.map((post) => (
            <article
              key={post.id}
              className="group relative flex flex-col space-y-4 bg-card p-6 rounded-lg shadow-sm"
            >
              <h2 className="text-2xl font-bold text-center">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:underline text-[#1B4332]"
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

          {(!posts || posts.length === 0) && (
            <div className="text-center text-muted-foreground">
              No blog posts found in this category.
            </div>
          )}
        </div>
      </div>
    </>
  )
} 