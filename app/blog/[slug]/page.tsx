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

  const imageUrl = post.featured_image || firstContentImage || "https://www.ethiotranscripts.com/og-image.jpg"
  const postUrl = `https://www.ethiotranscripts.com/blog/${post.slug}`

  return {
    title: post.title,
    description: post.excerpt,
    metadataBase: new URL('https://www.ethiotranscripts.com'),
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: postUrl,
      siteName: "EthioTranscripts",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/jpeg",
        },
      ],
      ...(youtubeId && {
        videos: [
          {
            url: `https://www.youtube.com/watch?v=${youtubeId}`,
            secureUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
            type: "text/html",
            width: 1280,
            height: 720,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      site: "@ethiotranscripts",
      creator: "@ethiotranscripts",
      title: post.title,
      description: post.excerpt,
      images: [{
        url: imageUrl,
        alt: post.title,
        width: 1200,
        height: 630,
      }],
    },
    other: {
      // Facebook specific tags
      "fb:app_id": process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
      "og:video:type": youtubeId ? "text/html" : undefined,
      "og:video:width": youtubeId ? "1280" : undefined,
      "og:video:height": youtubeId ? "720" : undefined,
      "og:video": youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : undefined,
      "og:video:secure_url": youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : undefined,
      // LinkedIn specific tags
      "article:published_time": post.published_at,
      "article:modified_time": post.updated_at,
      "article:section": post.categories?.[0]?.category?.name,
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