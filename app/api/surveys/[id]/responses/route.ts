import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

// Datos de demo para respuestas
const DEMO_RESPONSES = [
  { id: 'r1', userName: 'María García', role: 'PM', submittedAt: '2025-10-15' },
  { id: 'r2', userName: 'Carlos López', role: 'EM', submittedAt: '2025-10-14' },
  { id: 'r3', userName: 'Ana Rodríguez', role: 'TECH_LEAD', submittedAt: '2025-10-14' },
  { id: 'r4', userName: 'Roberto Sánchez', role: 'STAKEHOLDER', submittedAt: '2025-10-13' },
]

// GET - Obtener respuestas de un survey (datos de demo)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    return NextResponse.json({ 
      surveyId: params.id,
      responses: DEMO_RESPONSES,
      totalResponses: DEMO_RESPONSES.length
    })
  } catch (error) {
    console.error('Get responses error:', error)
    return NextResponse.json({ error: 'Error al obtener respuestas' }, { status: 500 })
  }
}

// POST - Enviar respuesta (deshabilitado en demo)
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Enviar respuestas está deshabilitado en modo demo' },
    { status: 400 }
  )
}
