import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

// Datos de demo para surveys
const DEMO_SURVEYS = [
  {
    id: 'survey-001',
    title: 'October 2025 Team Alignment Survey',
    status: 'COMPLETED',
    deadline: '2025-10-31',
    responseCount: 24,
    totalParticipants: 28,
    createdAt: '2025-10-01',
  },
  {
    id: 'survey-002',
    title: 'Q4 Stakeholder Expectations',
    status: 'ACTIVE',
    deadline: '2025-11-15',
    responseCount: 8,
    totalParticipants: 12,
    createdAt: '2025-11-01',
  },
  {
    id: 'survey-003',
    title: 'Sprint Process Feedback',
    status: 'DRAFT',
    deadline: null,
    responseCount: 0,
    totalParticipants: 0,
    createdAt: '2025-11-10',
  },
]

// GET - Listar surveys (datos de demo)
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    return NextResponse.json({ surveys: DEMO_SURVEYS })
  } catch (error) {
    console.error('Get surveys error:', error)
    return NextResponse.json({ error: 'Error al obtener surveys' }, { status: 500 })
  }
}

// POST - Crear survey (deshabilitado en demo)
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Crear surveys está deshabilitado en modo demo' },
    { status: 400 }
  )
}
