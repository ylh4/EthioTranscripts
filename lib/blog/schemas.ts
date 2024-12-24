import { z } from "zod"

export const blogCategorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  slug: z.string().min(1, "Slug is required").max(100, "Slug is too long"),
  description: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})

export const blogPostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  slug: z.string().min(1, "Slug is required").max(100, "Slug is too long"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().min(1, "Excerpt is required").max(300, "Excerpt is too long"),
  featured_image: z.string().optional(),
  published_at: z.string().nullable().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  categories: z.array(blogCategorySchema).optional(),
})

export const blogCommentSchema = z.object({
  id: z.string().optional(),
  post_id: z.string(),
  author_name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  author_email: z.string().email("Invalid email address"),
  content: z.string().min(1, "Comment is required"),
  is_approved: z.boolean().default(false),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})

export type BlogCategory = z.infer<typeof blogCategorySchema>
export type BlogPost = z.infer<typeof blogPostSchema>
export type BlogComment = z.infer<typeof blogCommentSchema> 