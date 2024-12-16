import { Metadata } from "next"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { BlogPostEditor } from "@/components/blog/blog-post-editor"
import { PageHeader } from "@/components/page-header"
import type { BlogPost } from "@/lib/blog/schemas"

export const metadata: Metadata = {
  title: "Edit Blog Post",
  description: "Edit an existing blog post",
}

interface EditBlogPostPageProps {
  params: {
    id: string
  }
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const supabase = createServerComponentClient({ cookies })
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", params.id)
    .single()

  return (
    <div className="container space-y-8 py-8">
      <PageHeader
        heading="Edit Blog Post"
        text="Edit and update your blog post"
      />
      <div className="mx-auto max-w-4xl">
        <BlogPostEditor post={post as BlogPost} />
      </div>
    </div>
  )
} 