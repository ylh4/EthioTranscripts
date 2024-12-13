import * as z from "zod"

export const adminLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export type AdminLoginData = z.infer<typeof adminLoginSchema>