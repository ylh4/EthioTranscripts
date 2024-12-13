import { redirect } from "next/navigation"
import { AUTH_ROUTES } from "@/lib/admin/config/constants"

export default function AdminPage() {
  redirect(AUTH_ROUTES.LOGIN)
}