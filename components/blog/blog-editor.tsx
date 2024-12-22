"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/blog/image-upload"
import { Icons } from "@/components/icons"

interface BlogEditorProps {
  content: string
  onChange: (content: string) => void
  isSubmitting?: boolean
}

export function BlogEditor({ content, onChange, isSubmitting }: BlogEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleImageUpload = (imageUrl: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    // Create markdown image syntax
    const imageMarkdown = `\n![Image](${imageUrl})\n`

    // Insert the image markdown at cursor position
    const newContent = content.substring(0, start) + imageMarkdown + content.substring(end)
    onChange(newContent)

    // Update cursor position
    const newCursorPos = start + imageMarkdown.length
    textarea.focus()
    textarea.setSelectionRange(newCursorPos, newCursorPos)
  }

  return (
    <div className="relative">
      <div className="sticky top-0 z-10 flex items-center gap-2 bg-background py-2 mb-2">
        <ImageUpload onUpload={handleImageUpload} />
        {isSubmitting && (
          <Icons.spinner className="h-4 w-4 animate-spin" />
        )}
      </div>
      <Textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your blog post content here... Use markdown for formatting."
        className="min-h-[500px] resize-y font-mono"
      />
    </div>
  )
} 