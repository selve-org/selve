// src/app/(main)/layout.tsx
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { FooterVisibilityProvider } from "@/context/FooterVisibilityContext";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
