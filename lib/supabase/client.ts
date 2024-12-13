"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from './types'

export const createClient = () => {
  return createClientComponentClient<Database>()
}

export const supabase = createClient()