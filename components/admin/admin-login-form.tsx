"use client"

import { useCallback } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { FormProvider } from "react-hook-form"
import { AdminLoginFields } from "./admin-login-fields"
import { adminLoginSchema, type AdminLoginData } from "@/lib/admin/schemas"
import { useAdminAuth } from "@/lib/admin/hooks/use-admin-auth"

export function AdminLoginForm() {
  const { login, isLoading } = useAdminAuth()
  
  const form = useForm<AdminLoginData>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = useCallback(async (values: AdminLoginData) => {
    await login(values.email, values.password)
  }, [login])

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <AdminLoginFields form={form} />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </FormProvider>
  )
}