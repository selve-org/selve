'use client'

import { SignIn } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'

export default function SignInPage() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect_url')

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SignIn
        fallbackRedirectUrl={redirectUrl || undefined}
        forceRedirectUrl={redirectUrl || undefined}
      />
    </div>
  )
}
