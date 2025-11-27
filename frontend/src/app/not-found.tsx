// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-neutral-950 flex items-center justify-center px-6">
      <div className="max-w-2xl">
        {/* 404 Label */}
        <p className="text-sm font-semibold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
          404 ERROR
        </p>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-mono font-light text-white mb-6 leading-tight">
          We can&apos;t find that page.
        </h1>

        {/* Subtext */}
        <p className="text-neutral-400 text-base sm:text-lg mb-10">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>

        {/* CTA Button */}
        <Link
          href="/"
          className="inline-block px-6 py-3 font-mono text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded transition-all duration-200"
        >
          Take me home
        </Link>
      </div>
    </main>
  );
}
