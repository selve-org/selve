'use client'

import { SignIn } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'

export default function SignInPage() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect_url')?.trim()

  // Always send user through /auth/redirect so welcome toast is shown
  // Pass the original redirect_to if available, otherwise just go to home after
  const afterSignInUrl = redirectUrl
    ? `/auth/redirect?redirect_to=${encodeURIComponent(redirectUrl)}`
    : '/auth/redirect'

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SignIn
        forceRedirectUrl={afterSignInUrl}
        fallbackRedirectUrl="/auth/redirect"
      />
    </div>
  )
}
