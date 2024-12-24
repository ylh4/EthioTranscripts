"use client"

import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Markdown } from "@/components/ui/markdown"
import type { BlogPost } from "@/lib/blog/schemas"

export default function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPost() {
      try {
        console.log('Fetching post with slug/id:', params.slug)
        const response = await fetch(`/api/blog/${params.slug}`)
        const data = await response.json()

        if (!response.ok) {
          console.error('Error response:', data)
          throw new Error(data.error || 'Failed to fetch post')
        }

        console.log('Fetched post:', data)
        setPost(data)
      } catch (error) {
        console.error('Error loading blog post:', error)
        setError(error instanceof Error ? error.message : 'Failed to load blog post')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [params.slug, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">{error}</div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-muted-foreground">Blog post not found</div>
      </div>
    )
  }

  return (
    <article className="prose prose-green max-w-none pl-8 md:pl-12 lg:pl-16">
      <h1 className="text-3xl font-bold mb-4 text-[#1B4332]">{post.title}</h1>
      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-8">
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
      <Markdown content={post.content} />
    </article>
  )
} 