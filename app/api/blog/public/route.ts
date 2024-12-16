import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")
    const category = searchParams.get("category")
    
    const supabase = createRouteHandlerClient({ cookies })
    
    if (slug) {
      // Get single post
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          *,
          categories:blog_posts_categories(
            category:blog_categories(*)
          )
        `)
        .eq("slug", slug)
        .single()

      if (error) throw error
      if (!data || !data.published_at) {
        return new NextResponse("Not found", { status: 404 })
      }

      return NextResponse.json(data)
    } else if (category) {
      // Get posts by category
      const { data: posts, error } = await supabase
        .from("blog_posts")
        .select(`
          *,
          categories:blog_posts_categories(
            category:blog_categories(*)
          )
        `)
        .not("published_at", "is", null)
        .lte("published_at", new Date().toISOString())
        .eq("blog_posts_categories.category_id", category)
        .order("published_at", { ascending: false })

      if (error) throw error

      return NextResponse.json(posts)
    } else {
      // Get all published posts
      const { data: posts, error } = await supabase
        .from("blog_posts")
        .select(`
          *,
          categories:blog_posts_categories(
            category:blog_categories(*)
          )
        `)
        .not("published_at", "is", null)
        .lte("published_at", new Date().toISOString())
        .order("published_at", { ascending: false })

      if (error) throw error

      return NextResponse.json(posts)
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 