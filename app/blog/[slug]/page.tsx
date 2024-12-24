import { format } from "date-fns"
import { Metadata } from "next"
import { Markdown } from "@/components/ui/markdown"
import { getPostBySlug } from "@/lib/blog"

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  // Extract the first image URL from the content if no featured image
  const contentImageMatch = post.content.match(/!\[.*?\]\((.*?)\)/)
  const firstContentImage = contentImageMatch ? contentImageMatch[1] : null

  // Extract YouTube video ID if present
  const youtubeMatch = post.content.match(/youtube:([a-zA-Z0-9_-]+)/)
  const youtubeId = youtubeMatch ? youtubeMatch[1] : null

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://www.ethiotranscripts.com/blog/${post.slug}`,
      images: [
        {
          url: post.featured_image || firstContentImage || "https://www.ethiotranscripts.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      ...(youtubeId && {
        videos: [
          {
            url: `https://www.youtube.com/watch?v=${youtubeId}`,
            width: 1280,
            height: 720,
            type: "video/mp4",
          },
        ],
      }),
    },
    twitter: {
      card: youtubeId ? "player" : "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.featured_image || firstContentImage || "https://www.ethiotranscripts.com/og-image.jpg"],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-center text-muted-foreground">Blog post not found</div>
      </div>
    )
  }

  return (
    <article className="prose prose-green max-w-none pb-8">
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
      {post.featured_image && (
        <div className="mb-8">
          <img
            src={post.featured_image}
            alt={post.title}
            className="rounded-lg w-full"
          />
        </div>
      )}
      <Markdown content={post.content} />
    </article>
  )
} 