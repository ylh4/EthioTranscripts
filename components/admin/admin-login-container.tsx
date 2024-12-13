"use client"

import { useAdminLogin } from "@/lib/admin/hooks/use-admin-login"
import { AdminLoginForm } from "./admin-login-form"

export default function AdminLoginContainer() {
  const { login, isLoading } = useAdminLogin()
  return <AdminLoginForm onSubmit={login} isLoading={isLoading} />
}