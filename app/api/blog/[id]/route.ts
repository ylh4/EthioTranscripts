import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
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
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const json = await request.json()
    const { categories: categoryIds, ...postData } = json

    // First, check if the post exists
    const { data: existingPost, error: checkError } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("id", params.id)
      .single()

    if (checkError || !existingPost) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      )
    }

    // Update the blog post
    const { error: updateError } = await supabase
      .from("blog_posts")
      .update({
        ...postData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 400 }
      )
    }

    // Delete existing category relationships
    const { error: deleteError } = await supabase
      .from("blog_posts_categories")
      .delete()
      .eq("post_id", params.id)

    if (deleteError) {
      return NextResponse.json(
        { error: "Failed to update categories" },
        { status: 400 }
      )
    }

    // If categories are provided, create new relationships
    if (categoryIds && categoryIds.length > 0) {
      const categoryRelations = categoryIds.map((categoryId: string) => ({
        post_id: params.id,
        category_id: categoryId,
      }))

      const { error: categoryError } = await supabase
        .from("blog_posts_categories")
        .insert(categoryRelations)

      if (categoryError) {
        return NextResponse.json(
          { error: "Failed to update categories" },
          { status: 400 }
        )
      }
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

    if (fetchError || !fullPost) {
      return NextResponse.json(
        { error: "Failed to fetch updated post" },
        { status: 400 }
      )
    }

    return NextResponse.json(fullPost)
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
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