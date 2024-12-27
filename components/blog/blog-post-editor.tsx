"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import MDEditor from "@uiw/react-md-editor"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/blog/image-upload"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { blogPostSchema, type BlogPost } from "@/lib/blog/schemas"
import { Youtube } from "lucide-react"

interface BlogPostEditorProps {
  post?: BlogPost
}

export function BlogPostEditor({ post }: BlogPostEditorProps) {
  const router = useRouter()
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [isYoutubeDialogOpen, setIsYoutubeDialogOpen] = useState(false)

  const form = useForm<BlogPost>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: post?.title ?? "",
      slug: post?.slug ?? "",
      content: post?.content ?? "",
      excerpt: post?.excerpt ?? "",
      featured_image: post?.featured_image ?? "",
      published_at: post?.published_at ?? null,
    },
  })

  const onSubmit = useCallback(async (values: BlogPost) => {
    try {
      const postData = {
        ...values,
      }

      const response = await fetch(`/api/blog${post ? `/${post.id}` : ""}`, {
        method: post ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to save post")
      }

      // Revalidate the blog pages
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: '/blog'
        })
      });

      if (post?.slug) {
        await fetch('/api/revalidate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: `/blog/${post.slug}`
          })
        });
      }

      toast.success(post ? "Post updated successfully" : "Post created successfully")
      router.refresh()
      router.push("/admin/blog")
    } catch (error) {
      console.error("Error saving post:", error)
      toast.error(error instanceof Error ? error.message : "Failed to save post")
    }
  }, [post, router])

  const handlePublishToggle = (checked: boolean) => {
    form.setValue("published_at", checked ? new Date().toISOString() : null)
  }

  const handleImageUpload = (imageUrl: string, caption: string) => {
    const content = form.getValues("content")
    const imageMarkdown = caption
      ? `\n![${caption}](${imageUrl})\n*${caption}*\n`
      : `\n![Image](${imageUrl})\n`
    form.setValue("content", content + imageMarkdown)
  }

  const handleYoutubeAdd = () => {
    try {
      const url = new URL(youtubeUrl)
      let videoId = ""

      if (url.hostname === "youtu.be") {
        videoId = url.pathname.slice(1)
      } else if (url.searchParams.has("v")) {
        videoId = url.searchParams.get("v") || ""
      }

      if (!videoId) {
        throw new Error("Invalid YouTube URL")
      }

      const content = form.getValues("content")
      const youtubeMarkdown = `\nyoutube:${videoId}\n`
      form.setValue("content", content + youtubeMarkdown)
      setYoutubeUrl("")
      setIsYoutubeDialogOpen(false)
      toast.success("YouTube video added successfully")
    } catch (error) {
      toast.error("Please enter a valid YouTube URL")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="featured_image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured Image URL</FormLabel>
              <div className="space-y-4">
                <FormControl>
                  <div className="flex gap-2">
                    <Input {...field} placeholder="Enter image URL or upload an image" />
                    <ImageUpload onUpload={(url) => field.onChange(url)} />
                  </div>
                </FormControl>
                {field.value && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                    <img
                      src={field.value}
                      alt="Featured image preview"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Dialog open={isYoutubeDialogOpen} onOpenChange={setIsYoutubeDialogOpen}>
                      <DialogTrigger asChild>
                        <Button type="button" variant="outline" size="icon">
                          <Youtube className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add YouTube Video</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <Input
                            value={youtubeUrl}
                            onChange={(e) => setYoutubeUrl(e.target.value)}
                            placeholder="Enter YouTube URL"
                          />
                          <Button type="button" onClick={handleYoutubeAdd}>
                            Add Video
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <ImageUpload onUpload={(url, caption) => handleImageUpload(url, caption)} />
                  </div>
                  <MDEditor
                    value={field.value}
                    onChange={(value) => field.onChange(value ?? "")}
                    preview="edit"
                    className="min-h-[500px]"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="published_at"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel>Published</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value !== null}
                  onCheckedChange={handlePublishToggle}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">{post ? "Update" : "Create"} Post</Button>
        </div>
      </form>
    </Form>
  )
} 