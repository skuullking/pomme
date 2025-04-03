import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Middleware simplifié qui ne fait pas de redirection automatique
export function middleware(request: NextRequest) {
  // Définir un cookie pour indiquer que l'utilisateur a visité le site
  const response = NextResponse.next()

  // Si l'utilisateur visite la page de choix de connexion, définir un cookie
  if (request.nextUrl.pathname === "/login-choice") {
    response.cookies.set("visited_login_choice", "true", {
      maxAge: 60 * 60 * 24 * 30, // 30 jours
      path: "/",
    })
  }

  return response
}

export const config = {
  matcher: ["/login-choice"],
}

