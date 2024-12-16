import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { blogPostSchema } from "@/lib/blog/schemas"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        categories:blog_posts_categories(
          category:blog_categories(*)
        )
      `)
      .eq("id", params.id)
      .single()

    if (error) throw error
    if (!data) return new NextResponse("Not found", { status: 404 })

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const json = await request.json()
    const { categories: categoryIds, ...postData } = json

    // Update the blog post
    const { data: post, error: postError } = await supabase
      .from("blog_posts")
      .update({
        ...postData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single()

    if (postError) throw postError
    if (!post) return new NextResponse("Not found", { status: 404 })

    // Delete existing category relationships
    const { error: deleteError } = await supabase
      .from("blog_posts_categories")
      .delete()
      .eq("post_id", params.id)

    if (deleteError) throw deleteError

    // If categories are provided, create new relationships
    if (categoryIds && categoryIds.length > 0) {
      const categoryRelations = categoryIds.map((categoryId: string) => ({
        post_id: params.id,
        category_id: categoryId,
      }))

      const { error: categoryError } = await supabase
        .from("blog_posts_categories")
        .insert(categoryRelations)

      if (categoryError) throw categoryError
    }

    // Fetch the updated post with categories
    const { data: fullPost, error: fetchError } = await supabase
      .from("blog_posts")
      .select(`
        *,
        categories:blog_posts_categories(
          category:blog_categories(*)
        )
      `)
      .eq("id", params.id)
      .single()

    if (fetchError) throw fetchError

    return NextResponse.json(fullPost)
  } catch (error) {
    console.error("Error updating blog post:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", params.id)

    if (error) throw error

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 