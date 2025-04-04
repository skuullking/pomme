import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
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
