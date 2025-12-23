import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

// Análisis de demo pre-generado
const DEMO_ANALYSIS = {
  summary: 'El análisis de la encuesta de octubre revela áreas de mejora en la planificación de sprints y comunicación asíncrona.',
  alignmentScore: 58,
  insights: [
    {
      id: 'i1',
      category: 'PROCESS',
      title: 'Bi-weekly Sprint Planning Workshops',
      description: '65% of developers report unclear sprint priorities, leading to misaligned work and rework cycles.',
      impact: 'HIGH_RISK',
      confidence: 0.85,
      affectedRoles: ['PM', 'EM', 'TECH_LEAD'],
      recommendation: 'Implement structured bi-weekly sprint planning sessions with clear agenda and outcomes.'
    },
    {
      id: 'i2',
      category: 'COMMUNICATION',
      title: 'Async Communication Guidelines',
      description: 'Lack of clear async communication protocols causes delays in cross-functional projects.',
      impact: 'NEEDS_ATTENTION',
      confidence: 0.78,
      affectedRoles: ['PM', 'EM'],
      recommendation: 'Define clear guidelines for when to use sync vs async communication.'
    },
    {
      id: 'i3',
      category: 'STAKEHOLDER',
      title: 'Stakeholder Expectation Alignment',
      description: 'Stakeholders report feeling disconnected from development progress and priorities.',
      impact: 'NEEDS_ATTENTION',
      confidence: 0.72,
      affectedRoles: ['PM', 'STAKEHOLDER'],
      recommendation: 'Establish regular stakeholder update cadence and documentation.'
    }
  ],
  suggestedActions: [
    { title: 'Schedule Bi-weekly Sprint Planning', priority: 'HIGH', owner: 'EM' },
    { title: 'Create Async Communication Guidelines', priority: 'HIGH', owner: 'PM' },
    { title: 'Establish Stakeholder Update Cadence', priority: 'MEDIUM', owner: 'PM' },
  ]
}

// POST - Analizar survey (retorna análisis de demo)
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    // Retornar análisis de demo
    return NextResponse.json({ 
      surveyId: params.id,
      analysis: DEMO_ANALYSIS,
      note: 'Este es un análisis de demostración. En producción, el análisis sería generado por AI basado en respuestas reales.'
    })
  } catch (error) {
    console.error('Analyze error:', error)
    return NextResponse.json({ error: 'Error al analizar' }, { status: 500 })
  }
}
