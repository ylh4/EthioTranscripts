import { Metadata } from "next"
import { BlogPostEditor } from "@/components/blog/blog-post-editor"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Create New Blog Post",
  description: "Create a new blog post",
}

export default function NewBlogPostPage() {
  return (
    <div className="container space-y-8 py-8">
      <PageHeader
        heading="Create New Blog Post"
        text="Create and publish a new blog post"
      />
      <div className="mx-auto max-w-4xl">
        <BlogPostEditor />
      </div>
    </div>
  )
} 