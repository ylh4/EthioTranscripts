"use client"

import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { PageHeader } from "@/components/page-header"
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

  if (error || !post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
        <p className="text-muted-foreground">{error || 'Post not found'}</p>
        <button 
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
        >
          Go Back
        </button>
      </div>
    )
  }

  const isDraft = !post.published_at

  return (
    <>
      <PageHeader
        heading={post.title}
        text={post.excerpt}
      />

      {isDraft && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-md mb-8 text-center">
          This is a draft post and is not visible to the public
        </div>
      )}

      <div className="mt-8">
        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground mb-8">
          {post.published_at ? (
            <time dateTime={post.published_at}>
              {format(new Date(post.published_at), "MMMM d, yyyy")}
            </time>
          ) : (
            <span>Draft</span>
          )}
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