import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_ROUTES } from '@/lib/admin/config/constants'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  try {
    const { data: { session } } = await supabase.auth.getSession()

    // Handle admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      // Allow access to login page
      if (req.nextUrl.pathname === AUTH_ROUTES.LOGIN) {
        if (session) {
          return NextResponse.redirect(new URL(AUTH_ROUTES.DASHBOARD, req.url))
        }
        return res
      }

      // Require authentication for other admin routes
      if (!session) {
        return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, req.url))
      }

      // Verify admin status
      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', session.user.email)
        .single()

      if (!adminUser) {
        await supabase.auth.signOut()
        return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, req.url))
      }
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    // Only redirect to login for admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, req.url))
    }
    return res
  }
}

export const config = {
  matcher: ['/admin/:path*']
}