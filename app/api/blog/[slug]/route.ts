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
    
    // Check if the parameter is a UUID
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(params.slug)
    
    // If it's a UUID, try direct ID lookup first
    if (isUUID) {
      console.log('Attempting ID lookup for:', params.slug)
      const { data: post, error: idError } = await supabase
        .from("blog_posts")
        .select(`
          *,
          categories:blog_posts_categories(
            category:blog_categories(*)
          )
        `)
        .eq('id', params.slug)
        .single()

      console.log('ID lookup result:', { post, error: idError })

      if (idError) {
        if (idError.code === 'PGRST116') {
          console.log('Post not found by ID')
          return NextResponse.json(
            { error: "Post not found" },
            { status: 404 }
          )
        }
        throw idError
      }

      if (post) {
        console.log('Successfully found post by ID:', { id: post.id, slug: post.slug })
        return NextResponse.json(post)
      }
    }

    // If not found by ID or not a UUID, try slug lookup
    console.log('Attempting slug lookup for:', params.slug)
    const { data: post, error: slugError } = await supabase
      .from("blog_posts")
      .select(`
        *,
        categories:blog_posts_categories(
          category:blog_categories(*)
        )
      `)
      .eq('slug', params.slug)
      .single()

    console.log('Slug lookup result:', { post, error: slugError })

    if (slugError) {
      if (slugError.code === 'PGRST116') {
        console.log('Post not found by slug')
        return NextResponse.json(
          { error: "Post not found" },
          { status: 404 }
        )
      }
      throw slugError
    }

    if (!post) {
      console.log('No post found for slug/id:', params.slug)
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      )
    }

    console.log('Successfully found post by slug:', { id: post.id, slug: post.slug })
    return NextResponse.json(post)
  } catch (error) {
    console.error("Unexpected error fetching blog post:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch post" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const json = await request.json()

    // Extract categories from the request body
    const { categories, ...postData } = json

    // Check if we're updating by ID or slug
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(params.slug)
    
    // First, verify the post exists
    const { data: existingPost, error: findError } = await supabase
      .from("blog_posts")
      .select("id")
      .eq(isUUID ? 'id' : 'slug', params.slug)
      .single()

    if (findError) {
      if (findError.code === 'PGRST116') {
        // No post found
        return NextResponse.json(
          { error: "Post not found" },
          { status: 404 }
        )
      }
      console.error("Error finding post:", findError)
      return NextResponse.json(
        { error: findError.message },
        { status: 400 }
      )
    }

    if (!existingPost) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      )
    }

    // Update the blog post
    const { data: post, error: postError } = await supabase
      .from("blog_posts")
      .update(postData)
      .eq('id', existingPost.id)
      .select()
      .single()

    if (postError) {
      console.error("Error updating post:", postError)
      throw postError
    }

    if (!post) {
      return NextResponse.json(
        { error: "Failed to update post" },
        { status: 500 }
      )
    }

    // Handle categories if provided
    if (categories !== undefined) {
      // Delete existing category relationships
      const { error: deleteError } = await supabase
        .from("blog_posts_categories")
        .delete()
        .eq('post_id', post.id)

      if (deleteError) {
        console.error("Error deleting categories:", deleteError)
        throw deleteError
      }

      // Insert new category relationships if any
      if (categories && categories.length > 0) {
        const { error: insertError } = await supabase
          .from("blog_posts_categories")
          .insert(
            categories.map((categoryId: string) => ({
              post_id: post.id,
              category_id: categoryId
            }))
          )

        if (insertError) {
          console.error("Error inserting categories:", insertError)
          throw insertError
        }
      }
    }

    // Fetch the updated post with categories
    const { data: updatedPost, error: fetchError } = await supabase
      .from("blog_posts")
      .select(`
        *,
        categories:blog_posts_categories(
          category:blog_categories(*)
        )
      `)
      .eq('id', post.id)
      .single()

    if (fetchError) {
      console.error("Error fetching updated post:", fetchError)
      throw fetchError
    }

    if (!updatedPost) {
      return NextResponse.json(
        { error: "Failed to fetch updated post" },
        { status: 500 }
      )
    }

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update post" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Check if we're deleting by ID or slug
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(params.slug)
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq(isUUID ? 'id' : 'slug', params.slug)

    if (error) throw error

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    )
  }
} 