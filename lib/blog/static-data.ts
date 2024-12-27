import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getStaticPosts() {
  try {
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("*")
      .not("published_at", "is", null)
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false })

    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }

    console.log('Fetched posts:', posts?.length || 0);
    return posts || [];
  } catch (error) {
    console.error('Exception in getStaticPosts:', error);
    return [];
  }
}

export async function getStaticPostBySlug(slug: string) {
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle()

  return post
}

export async function getStaticPostsByCategory(categoryId: string) {
  const { data: posts } = await supabase
    .from("blog_posts")
    .select(`
      *,
      categories:blog_posts_categories!inner(
        category:blog_categories!inner(*)
      )
    `)
    .eq('blog_posts_categories.category_id', categoryId)
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })

  return posts || []
}

export async function getStaticCategories() {
  const { data: categories } = await supabase
    .from("blog_categories")
    .select("*")
    .order("name", { ascending: true })

  return categories || []
}

export async function getStaticCategoryBySlug(slug: string) {
  const { data: category } = await supabase
    .from("blog_categories")
    .select("*")
    .eq("slug", slug)
    .single()

  return category
}