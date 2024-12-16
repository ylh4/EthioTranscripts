import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")

    if (slug) {
      const { data, error } = await supabase
        .from("blog_categories")
        .select("*")
        .eq("slug", slug)
        .single()

      if (error) throw error
      if (!data) {
        return new NextResponse("Not found", { status: 404 })
      }

      return NextResponse.json(data)
    } else {
      const { data, error } = await supabase
        .from("blog_categories")
        .select("*")
        .order("name", { ascending: true })

      if (error) throw error

      return NextResponse.json(data)
    }
  } catch (error) {
    console.error("Error fetching categories:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const json = await request.json()

    const { data, error } = await supabase
      .from("blog_categories")
      .insert([
        {
          ...json,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error creating category:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 