import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { DEMO_TEAM, DEMO_USERS } from '@/lib/demo-data'

// GET - Listar teams (datos de demo)
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    // Retornar team de demo con miembros
    const teams = [{
      ...DEMO_TEAM,
      members: DEMO_USERS.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
      }))
    }]

    return NextResponse.json({ teams })
  } catch (error) {
    console.error('Get teams error:', error)
    return NextResponse.json({ error: 'Error al obtener teams' }, { status: 500 })
  }
}

// POST - Crear team (deshabilitado en demo)
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Crear teams está deshabilitado en modo demo' },
    { status: 400 }
  )
}
