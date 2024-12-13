import { createAdminUser } from '../lib/admin/setup'

async function createInitialAdmin() {
  const email = process.env.INITIAL_ADMIN_EMAIL
  const password = process.env.INITIAL_ADMIN_PASSWORD

  if (!email || !password) {
    console.error('Please provide INITIAL_ADMIN_EMAIL and INITIAL_ADMIN_PASSWORD environment variables')
    process.exit(1)
  }

  const result = await createAdminUser(email, password)

  if (result.success) {
    console.log('Admin user created successfully!')
  } else {
    console.error('Failed to create admin user:', result.error)
  }
}

createInitialAdmin().catch(console.error)