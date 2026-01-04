// src/app/(main)/layout.tsx
'use client'

import { useEffect } from 'react'
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { FooterVisibilityProvider } from "@/context/FooterVisibilityContext";
import { toast } from 'sonner'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check for welcome toast flag from auth redirect
  useEffect(() => {
    const shouldShowToast = sessionStorage.getItem('show_welcome_toast')
    if (shouldShowToast === 'true') {
      sessionStorage.removeItem('show_welcome_toast')
      toast.success('Welcome! You\'re signed in', {
        description: 'Great to have you here',
        duration: 3000,
      })
    }
  }, [])

  return (
    <FooterVisibilityProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
      </div>
    </FooterVisibilityProvider>
  );
}
