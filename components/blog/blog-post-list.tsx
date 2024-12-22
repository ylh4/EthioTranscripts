"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Pencil, Trash, Eye } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import type { BlogPost } from "@/lib/blog/schemas"

export function BlogPostList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [deletePostId, setDeletePostId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/blog")
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      toast.error("Failed to fetch blog posts")
    } finally {
      setIsLoading(false)
    }
  }

  const getViewLink = (post: BlogPost) => {
    if (!post.published_at) {
      return `/admin/blog/preview/${post.id}`
    }
    return `/blog/${post.slug}`
  }

  const deletePost = async (id: string) => {
    try {
      await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      })
      toast.success("Post deleted successfully")
      fetchPosts()
    } catch (error) {
      toast.error("Failed to delete post")
    }
    setDeletePostId(null)
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      post.published_at
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {post.published_at ? "Published" : "Draft"}
                  </span>
                </TableCell>
                <TableCell>
                  {post.created_at
                    ? format(new Date(post.created_at), "MMM d, yyyy")
                    : "-"}
                </TableCell>
                <TableCell>
                  {post.updated_at
                    ? format(new Date(post.updated_at), "MMM d, yyyy")
                    : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                    >
                      <Link href={getViewLink(post)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                    >
                      <Link href={`/admin/blog/${post.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeletePostId(post.id)}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {!isLoading && posts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No blog posts found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deletePostId} onOpenChange={() => setDeletePostId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog
              post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletePostId && deletePost(deletePostId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
} 