import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import { findDemoUserById, DemoUser } from './demo-data'

const JWT_SECRET = process.env.JWT_SECRET || 'worksense-dev-secret'

export interface JWTPayload {
  userId: string
  email: string
  role: string
  organizationId: string
}

// Generate JWT token
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

// Get current user from request (usando datos de demo)
export async function getCurrentUser(request: NextRequest): Promise<DemoUser | null> {
  const token = request.cookies.get('auth-token')?.value
  
  if (!token) return null
  
  const payload = verifyToken(token)
  if (!payload) return null
  
  // Usar datos de demo
  const user = findDemoUserById(payload.userId)
  
  return user || null
}

// Get user from cookies (for server components)
export async function getServerUser(): Promise<DemoUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value
  
  if (!token) return null
  
  const payload = verifyToken(token)
  if (!payload) return null
  
  // Usar datos de demo
  const user = findDemoUserById(payload.userId)
  
  return user || null
}
