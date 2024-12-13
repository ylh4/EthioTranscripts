import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { AUTH_ROUTES } from "@/lib/admin/config/constants"

export default async function AdminPage() {
  const supabase = createServerClient()
  
  try {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      redirect(AUTH_ROUTES.LOGIN)
    }
    
    redirect(AUTH_ROUTES.DASHBOARD)
  } catch (error) {
    console.error('Admin page error:', error)
    redirect(AUTH_ROUTES.LOGIN)
  }
}