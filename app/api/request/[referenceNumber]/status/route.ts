import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { z } from "zod"

const statusUpdateSchema = z.object({
  status: z.enum(["pending", "processing", "completed", "rejected"]),
  notes: z.string().optional(),
})

export async function PATCH(
  request: Request,
  { params }: { params: { referenceNumber: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const json = await request.json()
    const validatedData = statusUpdateSchema.parse(json)
    
    const { data, error } = await supabase
      .from("requests")
      .update({
        status: validatedData.status,
        notes: validatedData.notes,
        updated_at: new Date().toISOString(),
      })
      .eq("reference_number", params.referenceNumber)
      .select()
      .single()

    if (error) throw error
    if (!data) return new NextResponse("Not found", { status: 404 })

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating request status:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 