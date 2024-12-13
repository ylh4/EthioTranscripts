"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface LoginResult {
  success: boolean
  error?: string
}

export async function handleAdminLogin(email: string, password: string): Promise<LoginResult> {
  try {
    const supabase = createClientComponentClient()

    // First try to sign in with Supabase Auth
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      return {
        success: false,
        error: "Invalid credentials"
      }
    }

    // Then verify if the user is an admin
    const { data: isAdmin, error: checkError } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', email)
      .single()

    if (checkError || !isAdmin) {
      // If not an admin, sign out and return error
      await supabase.auth.signOut()
      return {
        success: false,
        error: "Unauthorized access"
      }
    }

    return {
      success: true
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      error: "An error occurred during login"
    }
  }
}