import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Public routes that don't require authentication
const publicRoutes = [
  "/survey",  // Public survey pages
  "/api/auth/login",
  "/api/auth/register",
  "/api/slack/webhook",
  "/api/slack/commands",
  "/api/surveys/[id]/responses", // Allow anonymous survey submissions
]

// Routes that should be accessible without auth during development
const devRoutes = ["/", "/surveys", "/insights", "/actions", "/settings"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if it's a public route
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
  
  // During development, allow all routes
  // TODO: Remove this in production
  const isDevelopment = process.env.NODE_ENV === "development"
  const isDevRoute = devRoutes.some(route => pathname === route || pathname.startsWith(route))
  
  if (isPublicRoute || (isDevelopment && isDevRoute)) {
    return NextResponse.next()
  }

  // Check for authentication token
  // TODO: Implement actual token validation
  const token = request.cookies.get("auth-token")?.value

  // For now, allow all requests in development
  if (!token && !isDevelopment) {
    // Redirect to login page
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}

