import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.COOKIE_SECRET || 'fallback-secret-change-in-production')

export async function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('dashboard_auth')
  let isAuthenticated = false

  if (authCookie?.value) {
    try {
      const { payload } = await jwtVerify(authCookie.value, secret)
      isAuthenticated = payload.authenticated === true
    } catch {
      isAuthenticated = false
    }
  }

  const isLoginPage = request.nextUrl.pathname === '/'
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard')

  if (isDashboard && !isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard/:path*']
}
