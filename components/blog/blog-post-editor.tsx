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
import { Checkbox } from "@/components/ui/checkbox"
import { ImageUpload } from "@/components/blog/image-upload"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { blogPostSchema, type BlogPost, type BlogCategory } from "@/lib/blog/schemas"
import { Youtube } from "lucide-react"

interface BlogPostEditorProps {
  post?: BlogPost
}

export function BlogPostEditor({ post }: BlogPostEditorProps) {
  const router = useRouter()
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    post?.categories?.map(({ category }) => category.id) ?? []
  )
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
      categories: post?.categories ?? [],
    },
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/blog/categories")
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        toast.error("Failed to fetch categories")
      }
    }
    fetchCategories()
  }, [])

  const onSubmit = useCallback(async (values: BlogPost) => {
    try {
      const postData = {
        ...values,
        categories: selectedCategories,
        categories: undefined,
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
  }, [post, router, selectedCategories])

  const handlePublishToggle = (checked: boolean) => {
    form.setValue("published_at", checked ? new Date().toISOString() : null)
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
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
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ImageUpload onUpload={handleImageUpload} />
                  <Dialog open={isYoutubeDialogOpen} onOpenChange={setIsYoutubeDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Youtube className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add YouTube Video</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <FormLabel>YouTube URL</FormLabel>
                          <Input
                            value={youtubeUrl}
                            onChange={(e) => setYoutubeUrl(e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=..."
                          />
                        </div>
                        <Button onClick={handleYoutubeAdd}>Add Video</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <span className="text-sm text-muted-foreground">
                    Upload an image or add a YouTube video to your post
                  </span>
                </div>
                <FormControl>
                  <MDEditor
                    value={field.value}
                    onChange={(value) => field.onChange(value ?? "")}
                    preview="edit"
                    height={400}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Categories</FormLabel>
          <div className="grid gap-4 md:grid-cols-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id!)}
                  onCheckedChange={() => toggleCategory(category.id!)}
                />
                <label
                  htmlFor={category.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </FormItem>

        <FormField
          control={form.control}
          name="published_at"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Published</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Make this post visible to the public
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={Boolean(field.value)}
                  onCheckedChange={handlePublishToggle}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">
            {post ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </form>
    </Form>
  )
} 