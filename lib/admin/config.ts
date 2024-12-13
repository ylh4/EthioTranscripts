import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

// Admin client with elevated privileges
export const adminClient = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Function to create a new admin user
export async function createAdminUser(email: string, password: string) {
  try {
    const { data, error } = await adminClient
      .from('admin_users')
      .insert([
        {
          email,
          password_hash: await hashPassword(password)
        }
      ])
      .select()
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error creating admin user:', error)
    return { success: false, error }
  }
}

// Helper function to hash passwords
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Buffer.from(hash).toString('base64')
}