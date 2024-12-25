import { format } from "date-fns"
import { Metadata } from "next"
import { Markdown } from "@/components/ui/markdown"
import { ShareButtons } from "@/components/ui/share-buttons"
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

  // Extract YouTube video ID if present (support both formats)
  const youtubeMatch = post.content.match(/(?:youtube:([a-zA-Z0-9_-]+)|(?:https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu\.be\/)([a-zA-Z0-9_-]+))/)
  const youtubeId = youtubeMatch ? (youtubeMatch[1] || youtubeMatch[2]) : null

  // Get YouTube thumbnail URL if video exists (using maxresdefault for highest quality)
  const youtubeThumbUrl = youtubeId 
    ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    : null

  // Extract the first image URL from the content if no featured image or video
  const contentImageMatch = !youtubeThumbUrl && post.content.match(/!\[.*?\]\((.*?)\)/)
  const firstContentImage = contentImageMatch ? contentImageMatch[1] : null

  // Remove the fallback to og-image.jpg
  const imageUrl = youtubeThumbUrl || post.featured_image || firstContentImage
  const postUrl = `https://www.ethiotranscripts.com/blog/${post.slug}`

  // Define base metadata
  const baseMetadata = {
    title: post.title,
    description: post.excerpt,
    url: postUrl,
    siteName: "EthioTranscripts",
    ...(imageUrl && {
      images: [{
        url: imageUrl,
        width: youtubeId ? 1280 : 1200,
        height: youtubeId ? 720 : 630,
        alt: post.title,
        type: "image/jpeg",
      }],
    }),
  }

  // Video-specific metadata
  const videoMetadata = youtubeId ? {
    type: "video.other",
    videos: [{
      url: `https://www.youtube.com/watch?v=${youtubeId}`,
      secureUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
      type: "text/html",
      width: 1280,
      height: 720,
    }],
    images: [{
      url: youtubeThumbUrl,
      secureUrl: youtubeThumbUrl,
      width: 1280,
      height: 720,
      alt: post.title,
      type: "image/jpeg",
    }],
  } : {}

  return {
    metadataBase: new URL('https://www.ethiotranscripts.com'),
    title: baseMetadata.title,
    description: baseMetadata.description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      ...baseMetadata,
      ...videoMetadata,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      site: "@ethiotranscripts",
      creator: "@ethiotranscripts",
      title: post.title,
      description: post.excerpt,
      images: videoMetadata.images || (baseMetadata.images || []),
    },
    other: {
      // Facebook specific tags
      "fb:app_id": process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,

      // Core OpenGraph tags
      "og:type": youtubeId ? "video.other" : "article",
      "og:title": post.title,
      "og:description": post.excerpt,
      "og:url": postUrl,
      "og:site_name": "EthioTranscripts",
      
      ...(imageUrl && {
        // Force video thumbnail for LinkedIn
        "og:image": youtubeThumbUrl || imageUrl,
        "og:image:secure_url": youtubeThumbUrl || imageUrl,
        "og:image:width": youtubeId ? "1280" : "1200",
        "og:image:height": youtubeId ? "720" : "630",
        "og:image:type": "image/jpeg",
        "og:image:alt": post.title,
      }),

      // Article metadata
      "article:published_time": post.published_at,
      "article:modified_time": post.updated_at,
      "article:section": post.categories?.[0]?.category?.name,
      "article:tag": post.categories?.map(({ category }) => category.name).join(","),

      ...(youtubeId && {
        // Video metadata (high priority for LinkedIn)
        "og:video": `https://www.youtube.com/watch?v=${youtubeId}`,
        "og:video:secure_url": `https://www.youtube.com/watch?v=${youtubeId}`,
        "og:video:type": "text/html",
        "og:video:width": "1280",
        "og:video:height": "720",
        
        // Additional video metadata
        "video:duration": "0",
        "video:release_date": post.published_at,
        "video:tag": post.categories?.map(({ category }) => category.name).join(","),
        
        // LinkedIn-specific
        "linkedin:owner": "EthioTranscripts",
        "og:rich_attachment": "true",
      }),
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

  const postUrl = `https://www.ethiotranscripts.com/blog/${params.slug}`

  return (
    <div className="max-w-none pb-8 mt-8">
      {/* Header Section */}
      <div className="mb-8 not-prose">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-[#1B4332]">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
          <time dateTime={post.published_at}>
            {format(new Date(post.published_at), "MMMM d, yyyy")}
          </time>
          {post.categories?.length > 0 && (
            <div className="flex items-center gap-1">
              <span>•</span>
              <div className="flex flex-wrap gap-1">
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
        <ShareButtons 
          url={postUrl}
          title={post.title}
          description={post.excerpt}
        />
      </div>

      {/* Featured Image */}
      {post.featured_image && (
        <div className="mb-8 not-prose">
          <img
            src={post.featured_image}
            alt={post.title}
            className="rounded-lg w-full"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-green max-w-none">
        <Markdown content={post.content} />
      </div>

      {/* Bottom Share Buttons */}
      <div className="mt-8 not-prose">
        <ShareButtons 
          url={postUrl}
          title={post.title}
          description={post.excerpt}
        />
      </div>
    </div>
  )
} 