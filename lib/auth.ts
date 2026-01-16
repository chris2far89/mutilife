import { cookies } from 'next/headers'

const AUTH_COOKIE_NAME = 'dashboard_auth'

export function setAuthCookie() {
  cookies().set(AUTH_COOKIE_NAME, 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  })
}

export function clearAuthCookie() {
  cookies().delete(AUTH_COOKIE_NAME)
}

export function isAuthenticated(): boolean {
  const authCookie = cookies().get(AUTH_COOKIE_NAME)
  return authCookie?.value === 'authenticated'
}
