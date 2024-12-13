import { redirect } from "next/navigation"
import { AUTH_ROUTES } from "@/lib/admin/config/constants"

export default function AdminPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p className="text-gray-600">Please wait while we verify your credentials.</p>
      </div>
    </div>
  )
}