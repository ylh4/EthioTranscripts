import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    console.log('Fetching blog post with slug/id:', params.slug)
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // First try to find the post by slug
    let { data: post, error: slugError } = await supabase
      .from("blog_posts")
      .select(`
        *,
        categories:blog_posts_categories(
          category:blog_categories(*)
        )
      `)
      .eq('slug', params.slug)
      .maybeSingle()

    console.log('Slug lookup result:', { post, error: slugError })

    // If no post found by slug and the param looks like a UUID, try finding by ID
    if (!post && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(params.slug)) {
      console.log('Attempting ID lookup for:', params.slug)
      const { data: idPost, error: idError } = await supabase
        .from("blog_posts")
        .select(`
          *,
          categories:blog_posts_categories(
            category:blog_categories(*)
          )
        `)
        .eq('id', params.slug)
        .maybeSingle()

      console.log('ID lookup result:', { post: idPost, error: idError })

      if (idError) {
        console.error("Error fetching blog post by ID:", idError)
        return NextResponse.json(
          { error: `Failed to fetch post by ID: ${idError.message}` },
          { status: 400 }
        )
      }

      post = idPost
    } else if (slugError && slugError.code === '22P02') {
      // This is a UUID format error, just treat it as a not found
      console.log('Invalid UUID format, treating as not found')
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      )
    } else if (slugError) {
      console.error("Error fetching blog post by slug:", slugError)
      return NextResponse.json(
        { error: `Failed to fetch post by slug: ${slugError.message}` },
        { status: 400 }
      )
    }

    if (!post) {
      console.log('No post found for slug/id:', params.slug)
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      )
    }

    console.log('Successfully found post:', { id: post.id, slug: post.slug })
    return NextResponse.json(post)
  } catch (error) {
    console.error("Unexpected error fetching blog post:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
} 