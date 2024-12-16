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
import { toast } from "sonner"
import { blogPostSchema, type BlogPost, type BlogCategory } from "@/lib/blog/schemas"

interface BlogPostEditorProps {
  post?: BlogPost
}

export function BlogPostEditor({ post }: BlogPostEditorProps) {
  const router = useRouter()
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    post?.categories?.map((cat) => cat.id!) ?? []
  )

  const form = useForm<BlogPost>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: post?.title ?? "",
      slug: post?.slug ?? "",
      content: post?.content ?? "",
      excerpt: post?.excerpt ?? "",
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
      // Add selected categories to the form data
      const postData = {
        ...values,
        categories: selectedCategories,
      }

      const response = await fetch(`/api/blog${post?.id ? `/${post.id}` : ""}`, {
        method: post?.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })

      if (!response.ok) {
        throw new Error("Failed to save post")
      }

      toast.success(post?.id ? "Post updated successfully" : "Post created successfully")
      router.push("/admin/blog")
    } catch (error) {
      toast.error("Failed to save post")
    }
  }, [post?.id, router, selectedCategories])

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
                <MDEditor
                  value={field.value}
                  onChange={(value) => field.onChange(value ?? "")}
                  preview="edit"
                  height={400}
                />
              </FormControl>
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

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/blog")}
          >
            Cancel
          </Button>
          <Button type="submit">
            {post?.id ? "Update" : "Create"} Post
          </Button>
        </div>
      </form>
    </Form>
  )
} 