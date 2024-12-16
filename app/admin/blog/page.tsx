import { Metadata } from "next"
import { BlogPostList } from "@/components/blog/blog-post-list"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blog Management",
  description: "Manage your blog posts",
}

export default function BlogManagementPage() {
  return (
    <div className="container space-y-8 py-8">
      <PageHeader
        heading="Blog Management"
        text="Create, edit, and manage your blog posts"
      >
        <div className="flex items-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/admin/blog/categories">
              View Categories
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/blog/new">
              Create New Post
            </Link>
          </Button>
        </div>
      </PageHeader>
      <BlogPostList />
    </div>
  )
} 