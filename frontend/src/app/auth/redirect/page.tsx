'use client'

import { useEffect, useRef } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'

export default function AuthRedirectPage() {
  const { isSignedIn, isLoaded } = useAuth()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect_to')?.trim() || null
  const hasShownToast = useRef(false)

  // Validate redirect URL to prevent open redirect vulnerability
  const isValidRedirect = (url: string | null): boolean => {
    if (!url) return false

    // Allow relative paths (same-origin redirects like /pricing, /profile, etc.)
    if (url.startsWith('/')) {
      return true
    }

    // For absolute URLs, only allow specific external domains (chatbot)
    try {
      const redirectUrl = new URL(url)
      const allowedHosts = [
        'localhost:4000',
        'chat.selve.me',
        process.env.NEXT_PUBLIC_CHATBOT_URL?.trim().replace(/^https?:\/\//, '')
      ].filter(Boolean)

      console.log('Validating redirect:', {
        url,
        redirectHost: redirectUrl.host,
        allowedHosts,
        isValid: allowedHosts.some(host => redirectUrl.host === host)
      })

      return allowedHosts.some(host => redirectUrl.host === host)
    } catch (e) {
      // Invalid URL format
      console.error('Redirect URL validation error:', e)
      return false
    }
  }

  useEffect(() => {
    console.log('Auth redirect useEffect:', { isLoaded, isSignedIn, redirectTo })

    if (!isLoaded) return

    if (isSignedIn) {
      // Set flag for destination page to show welcome toast
      if (!hasShownToast.current) {
        sessionStorage.setItem('show_welcome_toast', 'true')
        hasShownToast.current = true
      }

      // Redirect immediately (toast will show on destination page)
      if (redirectTo) {
        // Validate redirect URL before redirecting
        if (isValidRedirect(redirectTo)) {
          console.log('Redirecting to:', redirectTo)
          window.location.href = redirectTo
        } else {
          // Invalid redirect, go to home
          console.log('Invalid redirect, going to home')
          window.location.href = '/'
        }
      } else {
        // User is signed in but no valid redirect_to parameter
        // Redirect to home instead of staying on loading screen
        console.log('Signed in but no valid redirect_to, redirecting to home')
        window.location.href = '/'
      }
    } else if (!isSignedIn) {
      // User is not signed in, redirect to sign-in with return URL
      console.log('Not signed in, redirecting to sign-in')
      const signInUrl = new URL('/sign-in', window.location.origin)
      if (redirectTo && isValidRedirect(redirectTo)) {
        signInUrl.searchParams.set('redirect_url', redirectTo)
      }
      window.location.href = signInUrl.toString()
    }
  }, [isSignedIn, isLoaded, redirectTo])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Redirecting...</p>
      </div>
    </div>
  )
}
