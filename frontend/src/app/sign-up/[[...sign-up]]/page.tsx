'use client'

import { SignUp } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'

export default function SignUpPage() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect_url')

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SignUp
        fallbackRedirectUrl={redirectUrl || undefined}
        forceRedirectUrl={redirectUrl || undefined}
      />
    </div>
  )
}
