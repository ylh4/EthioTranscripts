"use client"

interface YouTubeProps {
  videoId: string
  title?: string
}

export function YouTube({ videoId, title }: YouTubeProps) {
  return (
    <div className="relative w-full pb-[56.25%] mb-4">
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title || "YouTube video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
} 