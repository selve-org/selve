'use client'

import { SignUp } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'

export default function SignUpPage() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect_url')?.trim()

  // Always send user through /auth/redirect so welcome toast is shown
  // Pass the original redirect_to if available, otherwise just go to home after
  const afterSignUpUrl = redirectUrl
    ? `/auth/redirect?redirect_to=${encodeURIComponent(redirectUrl)}`
    : '/auth/redirect'

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SignUp
        forceRedirectUrl={afterSignUpUrl}
        fallbackRedirectUrl="/auth/redirect"
      />
    </div>
  )
}
