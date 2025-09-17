// src/app/(wizard)/assessment/wizard/layout.tsx
import React from 'react'

export default function WizardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
