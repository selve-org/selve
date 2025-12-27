'use client'

import { SignIn } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'

export default function SignInPage() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect_url')

  // If we have a redirect_url, send user back to /auth/redirect
  // so it can properly handle the authenticated redirect
  const afterSignInUrl = redirectUrl
    ? `/auth/redirect?redirect_to=${encodeURIComponent(redirectUrl)}`
    : undefined

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SignIn
        forceRedirectUrl={afterSignInUrl}
        fallbackRedirectUrl="/"
      />
    </div>
  )
}
