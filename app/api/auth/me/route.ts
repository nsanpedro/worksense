import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // TODO: Implement actual session validation
  // Check cookies/tokens and return user data
  
  // For now, return unauthorized
  return NextResponse.json(
    { error: "Not authenticated" },
    { status: 401 }
  )
}

