'use client'

import { useEffect, useRef } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

export default function AuthRedirectPage() {
  const { isSignedIn, isLoaded } = useAuth()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect_to')?.trim() || null
  const hasShownToast = useRef(false)

  // Validate redirect URL to prevent open redirect vulnerability
  const isValidRedirect = (url: string | null): boolean => {
    if (!url) return false

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
      // Show welcome toast (only once)
      if (!hasShownToast.current) {
        toast.success('Welcome! You\'re signed in', {
          description: 'Great to have you here',
          duration: 3000,
        })
        hasShownToast.current = true
      }

      // Delay redirect to allow toast to be visible
      setTimeout(() => {
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
      }, 1500) // 1.5 second delay to show toast
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
