'use client'

import { Facebook, Linkedin, Twitter } from "lucide-react"
import { Button } from "./button"

interface ShareButtonsProps {
  url: string
  title: string
  description: string
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  }

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400')
  }

  return (
    <div className="flex items-center gap-2 my-4">
      <span className="text-sm text-muted-foreground">Share:</span>
      <Button
        variant="outline"
        size="icon"
        className="w-8 h-8"
        onClick={() => handleShare(shareLinks.linkedin)}
      >
        <Linkedin className="w-4 h-4" />
        <span className="sr-only">Share on LinkedIn</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="w-8 h-8"
        onClick={() => handleShare(shareLinks.facebook)}
      >
        <Facebook className="w-4 h-4" />
        <span className="sr-only">Share on Facebook</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="w-8 h-8"
        onClick={() => handleShare(shareLinks.twitter)}
      >
        <Twitter className="w-4 h-4" />
        <span className="sr-only">Share on X (Twitter)</span>
      </Button>
    </div>
  )
} 