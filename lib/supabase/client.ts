"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from './types'

export const createClient = () => {
  return createClientComponentClient<Database>({
    options: {
      persistSession: true,
      autoRefreshToken: true,
      // Increase default timeout for slower connections
      global: {
        fetch: (url, options) => {
          return fetch(url, {
            ...options,
            timeout: 20000, // 20 seconds
          })
        },
      },
      // Add retries for failed requests
      db: {
        schema: 'public',
        retryAttempts: 3,
        retryInterval: 1000, // 1 second between retries
      },
      auth: {
        persistSession: true,
        storageKey: 'supabase.auth.token',
        storage: window.localStorage,
        detectSessionInUrl: true,
        flowType: 'pkce',
      },
    },
  })
}

// Create a singleton instance
let supabaseInstance: ReturnType<typeof createClient>

export const supabase = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient()
  }
  return supabaseInstance
}