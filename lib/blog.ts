import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getAllPosts() {
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
  return posts
}

export async function getPostBySlug(slug: string) {
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
    return null
  }
  return data
}

export async function getPostsByCategory(categoryId: string) {
  const { data: posts, error } = await supabase
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

  if (error) throw error
  return posts
}

export async function getAllCategories() {
  const { data: categories, error } = await supabase
    .from("blog_categories")
    .select("*")
    .order("name", { ascending: true })

  if (error) throw error
  return categories
} 