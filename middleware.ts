import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_ROUTES } from '@/lib/admin/config/constants'

export const config = {
  matcher: ['/admin', '/admin/:path*']
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  try {
    const { data: { session } } = await supabase.auth.getSession()

    // Handle root admin path
    if (req.nextUrl.pathname === '/admin' || req.nextUrl.pathname === '/admin/') {
      return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, req.url))
    }

    // Allow access to login page
    if (req.nextUrl.pathname === AUTH_ROUTES.LOGIN) {
      if (session) {
        // Check if user is admin before redirecting to dashboard
        const { data: adminUser } = await supabase
          .from('admin_users')
          .select('id')
          .eq('email', session.user.email)
          .single()

        if (adminUser) {
          return NextResponse.redirect(new URL(AUTH_ROUTES.DASHBOARD, req.url))
        } else {
          await supabase.auth.signOut()
        }
      }
      return res
    }

    // For dashboard and other protected routes
    if (!session) {
      return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, req.url))
    }

    // Verify admin status for protected routes
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', session.user.email)
      .single()

    if (!adminUser) {
      await supabase.auth.signOut()
      return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, req.url))
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, req.url))
  }
}