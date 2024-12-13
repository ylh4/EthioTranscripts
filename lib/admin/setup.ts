import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_SERVICE_KEY } from '../supabase/config'

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  throw new Error('Missing required environment variables for admin setup')
}

const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export async function createAdminUser(email: string, password: string) {
  try {
    // First create the auth user
    const { data: authUser, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })

    if (authError) {
      console.error('Auth user creation error:', authError)
      throw authError
    }

    // Then create the admin user record
    const { data: adminUser, error: adminError } = await adminClient
      .from('admin_users')
      .insert([{ email }])
      .select()
      .single()

    if (adminError) {
      console.error('Admin user creation error:', adminError)
      // Clean up auth user if admin record creation fails
      await adminClient.auth.admin.deleteUser(authUser.user.id)
      throw adminError
    }

    return { 
      success: true, 
      data: { 
        authUser,
        adminUser 
      }
    }
  } catch (error) {
    console.error('Error creating admin user:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }
  }
}