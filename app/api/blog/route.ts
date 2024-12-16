import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const json = await request.json()
    
    const { categories: categoryIds, ...postData } = json
    
    // Insert the blog post
    const { data: post, error: postError } = await supabase
      .from("blog_posts")
      .insert([
        {
          ...postData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (postError) {
      return NextResponse.json(
        { error: postError.message },
        { status: 400 }
      )
    }

    // If categories are provided, create the relationships
    if (categoryIds && categoryIds.length > 0) {
      const categoryRelations = categoryIds.map((categoryId: string) => ({
        post_id: post.id,
        category_id: categoryId,
      }))

      const { error: categoryError } = await supabase
        .from("blog_posts_categories")
        .insert(categoryRelations)

      if (categoryError) {
        return NextResponse.json(
          { error: "Failed to add categories" },
          { status: 400 }
        )
      }
    }

    // Fetch the post with categories
    const { data: fullPost, error: fetchError } = await supabase
      .from("blog_posts")
      .select(`
        *,
        categories:blog_posts_categories(
          category:blog_categories(*)
        )
      `)
      .eq("id", post.id)
      .single()

    if (fetchError || !fullPost) {
      return NextResponse.json(
        { error: "Failed to fetch created post" },
        { status: 400 }
      )
    }

    return NextResponse.json(fullPost)
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function GET() {
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
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
} 