"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Image from "next/image"
import { YouTube } from "./youtube"

interface MarkdownProps {
  content: string
}

export function Markdown({ content }: MarkdownProps) {
  return (
    <div className="text-justify">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children, node }) => {
            // Check if this paragraph contains only an image
            const isImageOnly = node.children.length === 1 && node.children[0].type === 'image'
            // Check if this paragraph is an image caption (italic text right after an image)
            const isCaption = node.children.length === 1 && 
              node.children[0].type === 'emphasis' && 
              node.position?.start.line === (node.position?.start.line)
            // Check if this paragraph contains a YouTube embed
            const isYouTube = node.children.length === 1 && 
              node.children[0].type === 'text' && 
              typeof node.children[0].value === 'string' &&
              node.children[0].value.startsWith('youtube:')
            
            if (isYouTube) {
              const text = node.children[0].value as string
              const videoId = text.replace('youtube:', '').trim()
              return <YouTube videoId={videoId} />
            }
            
            if (isImageOnly) return children
            if (isCaption) {
              return (
                <p className="text-center text-sm text-muted-foreground mt-2 mb-6">
                  {children}
                </p>
              )
            }
            return <p className="mb-4 text-justify">{children}</p>
          },
          img: ({ src, alt }) => (
            <div className="flex justify-center my-2">
              <div className="relative max-w-2xl">
                <Image
                  src={src || ''}
                  alt={alt || ''}
                  width={800}
                  height={400}
                  className="rounded-lg"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          ),
          h1: ({ children }) => <h1 className="text-3xl font-bold mb-6">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-bold mb-4 mt-8">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-bold mb-3 mt-6">{children}</h3>,
          ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
          li: ({ children }) => <li className="text-justify">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary/20 pl-4 italic my-4 text-muted-foreground">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
              {children}
            </pre>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
} 