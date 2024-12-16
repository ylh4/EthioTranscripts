"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { PageHeader } from "@/components/page-header"
import type { BlogPost } from "@/lib/blog/schemas"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog/public")
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error("Failed to fetch posts:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <>
      <PageHeader
        heading="Blog"
        text="Read our latest blog posts and stay updated"
      />

      <div className="mt-8">
        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading posts...</div>
        ) : (
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
                No blog posts found.
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
} 