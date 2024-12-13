import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_ROUTES } from '@/lib/admin/config/constants'

export const config = {
  matcher: ['/admin', '/admin/dashboard/:path*']
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  try {
    const { data: { session } } = await supabase.auth.getSession()
    const isRootAdmin = req.nextUrl.pathname === '/admin'

    // If no session, redirect to login
    if (!session) {
      return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, req.url))
    }

    // Check if user is admin
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', session.user.email)
      .single()

    // If not admin, sign out and redirect to login
    if (!adminUser) {
      await supabase.auth.signOut()
      return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, req.url))
    }

    // If admin accessing root admin page, redirect to dashboard
    if (isRootAdmin) {
      return NextResponse.redirect(new URL(AUTH_ROUTES.DASHBOARD, req.url))
    }

    // Allow access to dashboard routes for admin users
    return res
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, req.url))
  }
}