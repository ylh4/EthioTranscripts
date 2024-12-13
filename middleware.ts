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
    const isLoginPage = req.nextUrl.pathname === AUTH_ROUTES.LOGIN
    const isRootAdmin = req.nextUrl.pathname === '/admin' || req.nextUrl.pathname === '/admin/'

    // If user is logged in, check if they're an admin
    if (session) {
      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', session.user.email)
        .single()

      // If user is an admin
      if (adminUser) {
        // If trying to access login page or root admin, redirect to dashboard
        if (isLoginPage || isRootAdmin) {
          return NextResponse.redirect(new URL(AUTH_ROUTES.DASHBOARD, req.url))
        }
        // Allow access to other admin routes
        return res
      } else {
        // If not an admin, sign them out
        await supabase.auth.signOut()
      }
    }

    // If not logged in or not an admin
    if (isLoginPage) {
      // Allow access to login page
      return res
    }

    // Redirect everything else to login
    return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, req.url))
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, req.url))
  }
}