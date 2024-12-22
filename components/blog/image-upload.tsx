"use client"

import { useState, useRef } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Icons } from "@/components/icons"
import { toast } from "sonner"

interface ImageUploadProps {
  onUpload: (url: string, caption: string) => void
  className?: string
}

export function ImageUpload({ onUpload, className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [showCaptionDialog, setShowCaptionDialog] = useState(false)
  const [caption, setCaption] = useState("")
  const [uploadedImageUrl, setUploadedImageUrl] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClientComponentClient()

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    fileInputRef.current?.click()
  }

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0]
      if (!file) return

      setIsUploading(true)
      console.log('Starting upload for file:', file.name)

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file')
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB')
        return
      }

      // Generate a unique file name
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `blog-images/${fileName}`
      
      console.log('Uploading file to path:', filePath)

      // First check if user is authenticated
      const { data: { session }, error: authError } = await supabase.auth.getSession()
      if (authError || !session) {
        console.error('Auth error:', authError)
        toast.error('Please sign in to upload images')
        return
      }

      const { error: uploadError, data } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        throw uploadError
      }

      console.log('Upload successful:', data)

      // Get the public URL
      const { data: { publicUrl }, error: urlError } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath)

      if (urlError) {
        console.error('Error getting public URL:', urlError)
        throw urlError
      }

      console.log('Got public URL:', publicUrl)
      setUploadedImageUrl(publicUrl)
      setShowCaptionDialog(true)
    } catch (error) {
      console.error('Error uploading image:', error)
      if (error instanceof Error) {
        toast.error(`Upload failed: ${error.message}`)
      } else {
        toast.error('Failed to upload image')
      }
    } finally {
      setIsUploading(false)
      // Reset the input
      if (event.target) {
        event.target.value = ''
      }
    }
  }

  const handleCaptionSubmit = () => {
    onUpload(uploadedImageUrl, caption)
    setShowCaptionDialog(false)
    setCaption("")
    setUploadedImageUrl("")
    toast.success('Image uploaded successfully')
  }

  return (
    <>
      <div className={className}>
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          disabled={isUploading}
          onClick={handleButtonClick}
        >
          {isUploading ? (
            <>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Icons.image className="mr-2 h-4 w-4" />
              Upload Image
            </>
          )}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
          disabled={isUploading}
        />
      </div>

      <Dialog open={showCaptionDialog} onOpenChange={setShowCaptionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Image Caption</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <img
                src={uploadedImageUrl}
                alt="Preview"
                className="max-h-48 rounded-md mx-auto"
              />
              <Input
                placeholder="Enter image caption (optional)"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCaptionSubmit()
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCaptionDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCaptionSubmit}>
              Insert Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
} 