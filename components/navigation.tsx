"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

export default function Navigation() {
  const pathname = usePathname()
  const { user, isAuthenticated, isGuest } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
            <path d="M10 2c1 .5 2 2 2 5" />
          </svg>
          <span className="ml-2 text-sm font-medium">Pomme</span>
        </Link>
        <nav className="ml-auto flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/compare"
            className={pathname === "/compare" ? "text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-900"}
          >
            iPhone
          </Link>
          <Link
            href="/price-tracker"
            className={
              pathname === "/price-tracker" ? "text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-900"
            }
          >
            Comparateur de Prix
          </Link>
          {isAuthenticated ? (
            <Link
              href="/account"
              className={pathname === "/account" ? "text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-900"}
            >
              {isGuest ? "Invité" : "Espace Compte"}
            </Link>
          ) : (
            <Link
              href="/login-choice"
              className={
                pathname === "/login-choice" ? "text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-900"
              }
            >
              Connexion
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

