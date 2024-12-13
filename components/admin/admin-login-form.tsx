"use client"

import { useCallback } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Lock } from "lucide-react"
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

  const handleSubmit = useCallback(async (values: AdminLoginData) => {
    await login(values.email, values.password)
  }, [login])

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl text-center">Administrator Access</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access the admin dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <AdminLoginFields form={form} />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default AdminLoginForm