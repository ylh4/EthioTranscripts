import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!
const adminEmail = process.env.INITIAL_ADMIN_EMAIL!
const adminPassword = process.env.INITIAL_ADMIN_PASSWORD!

async function setupAdmin() {
  if (!supabaseUrl || !supabaseServiceKey || !adminEmail || !adminPassword) {
    console.error('Missing required environment variables')
    console.error({
      supabaseUrl: !!supabaseUrl,
      supabaseServiceKey: !!supabaseServiceKey,
      adminEmail: !!adminEmail,
      adminPassword: !!adminPassword
    })
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  try {
    // First check if admin user already exists
    const { data: existingUser } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', adminEmail)
      .single()

    if (existingUser) {
      console.log('Admin user already exists:', adminEmail)
      return
    }

    // Create auth user
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true
    })

    if (authError) {
      throw authError
    }

    // Create admin user record
    const { error: adminError } = await supabase
      .from('admin_users')
      .insert([{ 
        email: adminEmail,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])

    if (adminError) {
      // Cleanup auth user if admin record creation fails
      await supabase.auth.admin.deleteUser(authUser.user.id)
      throw adminError
    }

    console.log('Admin user created successfully:', adminEmail)
  } catch (error) {
    console.error('Error setting up admin user:', error)
    process.exit(1)
  }
}

setupAdmin() 