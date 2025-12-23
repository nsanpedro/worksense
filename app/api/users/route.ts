import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { DEMO_USERS } from '@/lib/demo-data'

// GET - Listar usuarios (datos de demo)
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    // Retornar usuarios de demo
    const users = DEMO_USERS.map(u => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      team: u.team,
    }))

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json({ error: 'Error al obtener usuarios' }, { status: 500 })
  }
}

// POST - Crear usuario (deshabilitado en demo)
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Crear usuarios está deshabilitado en modo demo' },
    { status: 400 }
  )
}
