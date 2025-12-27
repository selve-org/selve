'use client'

import { SignUp } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'

export default function SignUpPage() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect_url')

  // If we have a redirect_url, send user back to /auth/redirect
  // so it can properly handle the authenticated redirect
  const afterSignUpUrl = redirectUrl
    ? `/auth/redirect?redirect_to=${encodeURIComponent(redirectUrl)}`
    : undefined

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SignUp
        forceRedirectUrl={afterSignUpUrl}
        fallbackRedirectUrl="/"
      />
    </div>
  )
}
