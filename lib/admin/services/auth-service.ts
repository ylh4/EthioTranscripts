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

      // Sign in with Supabase Auth
      const { data: signInData, error: signInError } = await supabase().auth.signInWithPassword({
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

      // After successful sign in, check admin status using RLS
      const { data: adminUser, error: checkError } = await supabase()
        .from('admin_users')
        .select('id')
        .eq('email', email)
        .single()

      if (checkError || !adminUser) {
        // If not an admin, sign out
        await supabase().auth.signOut()
        return { success: false, error: AUTH_ERRORS.UNAUTHORIZED }
      }

      // Cache the admin status in localStorage
      localStorage.setItem('isAdmin', 'true')
      localStorage.setItem('adminCacheTime', Date.now().toString())

      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: AUTH_ERRORS.UNKNOWN }
    }
  }

  async logout(): Promise<void> {
    await supabase().auth.signOut()
  }

  async getSession() {
    const { data: { session } } = await supabase().auth.getSession()
    return session
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const session = await this.getSession()
      if (!session) return false
      
      // Check cached admin status (valid for 1 hour)
      const cachedIsAdmin = localStorage.getItem('isAdmin')
      const cacheTime = localStorage.getItem('adminCacheTime')
      const cacheAge = cacheTime ? Date.now() - parseInt(cacheTime) : Infinity
      
      if (cachedIsAdmin === 'true' && cacheAge < 3600000) { // 1 hour
        return true
      }
      
      // If cache miss or expired, check database
      const { data: adminUser } = await supabase()
        .from('admin_users')
        .select('id')
        .eq('email', session.user.email)
        .single()
      
      // Update cache
      if (adminUser) {
        localStorage.setItem('isAdmin', 'true')
        localStorage.setItem('adminCacheTime', Date.now().toString())
      } else {
        localStorage.removeItem('isAdmin')
        localStorage.removeItem('adminCacheTime')
      }
      
      return !!adminUser
    } catch (error) {
      console.error('Error checking auth:', error)
      return false
    }
  }
}

export const authService = new AuthService()