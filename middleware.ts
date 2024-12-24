import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_ROUTES } from '@/lib/admin/config/constants'

export const config = {
  matcher: ['/admin', '/admin/dashboard/:path*', '/admin/blog/:path*']
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

    // Get admin status from cookie
    const adminStatusCookie = req.cookies.get('adminStatus')
    let isAdmin = false

    if (adminStatusCookie) {
      try {
        const { value, timestamp } = JSON.parse(adminStatusCookie.value)
        // Check if cache is still valid (1 hour)
        if (Date.now() - timestamp < 3600000) {
          isAdmin = value
        }
      } catch (e) {
        console.error('Error parsing admin status cookie:', e)
      }
    }

    // If no valid cache, check database
    if (!isAdmin) {
      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', session.user.email)
        .single()

      isAdmin = !!adminUser

      // Set cookie with admin status
      const cookieValue = JSON.stringify({
        value: isAdmin,
        timestamp: Date.now()
      })
      
      res.cookies.set('adminStatus', cookieValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 3600 // 1 hour
      })
    }

    // If not admin, sign out and redirect to login
    if (!isAdmin) {
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