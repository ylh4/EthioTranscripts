"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { PageHeader } from "@/components/page-header"
import type { BlogPost, BlogCategory } from "@/lib/blog/schemas"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [category, setCategory] = useState<BlogCategory | null>(null)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First get the category
        const categoryResponse = await fetch(`/api/blog/categories?slug=${params.slug}`)
        if (!categoryResponse.ok) {
          if (categoryResponse.status === 404) {
            notFound()
          }
          throw new Error("Failed to fetch category")
        }
        const categoryData = await categoryResponse.json()
        setCategory(categoryData)

        // Then get posts in this category
        const postsResponse = await fetch(`/api/blog/public?category=${categoryData.id}`)
        if (!postsResponse.ok) {
          throw new Error("Failed to fetch posts")
        }
        const postsData = await postsResponse.json()
        setPosts(postsData)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [params.slug])

  if (isLoading) {
    return (
      <div className="text-center text-muted-foreground">
        Loading...
      </div>
    )
  }

  if (!category) {
    notFound()
  }

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

          {(!posts || posts.length === 0) && !isLoading && (
            <div className="text-center text-muted-foreground">
              No blog posts found in this category.
            </div>
          )}
        </div>
      </div>
    </>
  )
} 