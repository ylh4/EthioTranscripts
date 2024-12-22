"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { Markdown } from "@/components/ui/markdown"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import type { BlogPost } from "@/lib/blog/schemas"

export default function BlogPreviewPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPost() {
      try {
        console.log('Fetching post with ID:', params.id)
        const response = await fetch(`/api/blog/${params.id}`)
        const data = await response.json()

        if (!response.ok) {
          console.error('Error response:', data)
          throw new Error(data.error || 'Failed to fetch post')
        }

        if (!data) {
          throw new Error('Post not found')
        }

        console.log('Successfully fetched post:', { id: data.id, title: data.title })
        setPost(data)
        setError(null)
      } catch (error) {
        console.error('Error loading blog post:', error)
        setError(error instanceof Error ? error.message : 'Failed to load blog post')
        toast.error(error instanceof Error ? error.message : 'Failed to load blog post')
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchPost()
    }
  }, [params.id])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading preview...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-muted-foreground mb-4">{error || 'Post not found'}</p>
          <Button 
            onClick={() => router.push('/admin/blog')}
            className="mt-4"
          >
            Back to Blog Posts
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={() => router.push('/admin/blog')}
        >
          Back to List
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push(`/admin/blog/${post.id}/edit`)}
        >
          Edit Post
        </Button>
      </div>

      <article className="bg-card rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-8">
          <PageHeader
            title={post.title}
            description={post.excerpt}
          />

          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-md my-6 text-center">
            This is a draft preview and is not visible to the public
          </div>

          <div className="prose prose-green max-w-none">
            <Markdown content={post.content} />
          </div>
        </div>
      </article>
    </div>
  )
} 