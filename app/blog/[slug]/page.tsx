"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { notFound } from "next/navigation"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { getStaticPosts, getStaticPostBySlug } from "@/lib/blog/static-data"
import { withSearchParams } from "@/components/layout/with-search-params"
import type { BlogPost } from "@/lib/blog/schemas"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    const loadPost = async () => {
      const postData = await getStaticPostBySlug(params.slug)
      if (!postData || !postData.published_at) {
        notFound()
      }
      setPost(postData)
    }
    loadPost()
  }, [params.slug])

  if (!post) {
    return null
  }

  return (
    <article className="bg-card p-8 rounded-lg shadow-sm">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#1B4332] mb-4">{post.title}</h1>
        <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">{post.excerpt}</p>
        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <time dateTime={post.published_at} className="font-medium">
            {format(new Date(post.published_at), "MMMM d, yyyy")}
          </time>
          {post.categories?.length > 0 && (
            <div className="flex items-center space-x-2">
              <span>•</span>
              <div className="flex items-center space-x-1">
                {post.categories.map(({ category }, index) => (
                  <span key={category.id} className="font-medium">
                    {category.name}
                    {index < post.categories.length - 1 && ", "}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
      <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
        <Markdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold text-[#1B4332] mt-12 mb-6">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-bold text-[#1B4332] mt-10 mb-4">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-bold text-[#1B4332] mt-8 mb-4">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="mb-6 text-justify leading-relaxed text-[#2D3748]">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="mb-6 space-y-2 ml-0">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-6 space-y-2 ml-0">{children}</ol>
            ),
            li: ({ children, ordered }) => (
              <li className="flex items-start">
                <span className="text-[#1B4332] mr-2 mt-1.5">
                  {ordered ? "•" : "•"}
                </span>
                <span className="flex-1 text-[#2D3748]">{children}</span>
              </li>
            ),
            a: ({ href, children }) => (
              <a 
                href={href} 
                className="text-[#1B4332] hover:underline font-medium" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-[#1B4332] pl-6 italic my-6 text-[#4A5568]">
                {children}
              </blockquote>
            ),
            pre: ({ children }) => (
              <pre className="bg-[#F7FAFC] p-4 rounded-lg overflow-x-auto my-6 text-[#2D3748]">
                {children}
              </pre>
            ),
            code: ({ children }) => (
              <code className="bg-[#F7FAFC] px-1.5 py-0.5 rounded text-sm text-[#2D3748]">
                {children}
              </code>
            ),
          }}
        >
          {post.content}
        </Markdown>
      </div>
    </article>
  )
}

export default withSearchParams(BlogPostPage) 