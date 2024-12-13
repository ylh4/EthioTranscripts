"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from './types'

export const createClient = () => {
  return createClientComponentClient<Database>({
    options: {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      global: {
        headers: {
          'X-Client-Info': 'ethiotranscripts'
        }
      }
    }
  })
}

export const supabase = createClient()