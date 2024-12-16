import { Metadata } from "next"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { PageHeader } from "@/components/page-header"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const supabase = createServerComponentClient({ cookies })
  const { data: category } = await supabase
    .from("blog_categories")
    .select("*")
    .eq("slug", params.slug)
    .single()

  if (!category) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: `${category.name} - Blog`,
    description: category.description || `Read our latest blog posts in ${category.name}`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const supabase = createServerComponentClient({ cookies })
  
  // First get the category
  const { data: category } = await supabase
    .from("blog_categories")
    .select("*")
    .eq("slug", params.slug)
    .single()

  if (!category) {
    notFound()
  }

  // Then get posts in this category
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
    .eq("blog_posts_categories.category_id", category.id)
    .order("published_at", { ascending: false })

  return (
    <>
      <PageHeader
        heading={category.name}
        text={category.description || `Read our latest blog posts in ${category.name}`}
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
        </div>

        {(!posts || posts.length === 0) && (
          <div className="text-center text-muted-foreground">
            No blog posts found in this category.
          </div>
        )}
      </div>
    </>
  )
} 