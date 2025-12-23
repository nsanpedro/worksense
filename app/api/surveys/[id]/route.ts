import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

// Datos de demo para un survey específico
const DEMO_SURVEY_DETAIL = {
  id: 'survey-001',
  title: 'October 2025 Team Alignment Survey',
  description: 'Monthly survey to measure team alignment and identify friction points',
  status: 'COMPLETED',
  deadline: '2025-10-31',
  createdAt: '2025-10-01',
  questions: [
    { id: 'q1', text: 'How aligned do you feel with the team\'s current priorities?', type: 'SCALE', targetRole: null },
    { id: 'q2', text: 'What is the biggest friction point in your daily work?', type: 'TEXT', targetRole: null },
    { id: 'q3', text: 'How clear are the sprint objectives?', type: 'SCALE', targetRole: 'PM' },
    { id: 'q4', text: 'Rate the effectiveness of cross-team communication', type: 'SCALE', targetRole: 'EM' },
  ],
  responseCount: 24,
  totalParticipants: 28,
}

// GET - Obtener survey por ID (datos de demo)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    // Retornar survey de demo
    return NextResponse.json({ survey: { ...DEMO_SURVEY_DETAIL, id: params.id } })
  } catch (error) {
    console.error('Get survey error:', error)
    return NextResponse.json({ error: 'Error al obtener survey' }, { status: 500 })
  }
}

// PUT - Actualizar survey (deshabilitado en demo)
export async function PUT(request: NextRequest) {
  return NextResponse.json(
    { error: 'Actualizar surveys está deshabilitado en modo demo' },
    { status: 400 }
  )
}

// DELETE - Eliminar survey (deshabilitado en demo)
export async function DELETE(request: NextRequest) {
  return NextResponse.json(
    { error: 'Eliminar surveys está deshabilitado en modo demo' },
    { status: 400 }
  )
}
