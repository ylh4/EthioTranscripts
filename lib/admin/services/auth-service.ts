"use client"

import { supabase } from '@/lib/supabase/client'
import { validateEmail, validatePassword } from '../utils/validation'
import { AUTH_ERRORS } from '../config/constants'
import type { LoginResult } from '../types'

class AuthService {
  async login(email: string, password: string): Promise<LoginResult> {
    try {
      if (!validateEmail(email)) {
        return { success: false, error: AUTH_ERRORS.INVALID_EMAIL }
      }

      if (!validatePassword(password)) {
        return { success: false, error: AUTH_ERRORS.INVALID_PASSWORD }
      }

      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        console.error('Sign in error:', signInError)
        return { success: false, error: AUTH_ERRORS.INVALID_CREDENTIALS }
      }

      if (!signInData.user) {
        return { success: false, error: AUTH_ERRORS.USER_NOT_FOUND }
      }

      const { data: adminUser, error: checkError } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', email)
        .single()

      if (checkError || !adminUser) {
        await supabase.auth.signOut()
        return { success: false, error: AUTH_ERRORS.UNAUTHORIZED }
      }

      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: AUTH_ERRORS.UNKNOWN }
    }
  }

  async logout(): Promise<void> {
    await supabase.auth.signOut()
  }

  async getSession() {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  }

  async isAuthenticated(): Promise<boolean> {
    const session = await this.getSession()
    if (!session) return false
    
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', session.user.email)
      .single()
    
    return !!adminUser
  }
}

export const authService = new AuthService()