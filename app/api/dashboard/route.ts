import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

// GET - Datos del dashboard (datos de demo)
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    // Datos de demo para el dashboard
    const dashboardData = {
      alignmentScore: 58,
      previousScore: 53,
      totalResponses: 24,
      responseRate: 85,
      surveysCompleted: 3,
      activeInsights: 8,
      criticalIssues: 3,
      pendingActions: 5,
      trends: [
        { month: 'May', score: 51 },
        { month: 'Jun', score: 48 },
        { month: 'Jul', score: 52 },
        { month: 'Aug', score: 49 },
        { month: 'Sep', score: 53 },
        { month: 'Oct', score: 58 },
      ],
      recentInsights: [
        {
          id: '1',
          title: 'Bi-weekly Sprint Planning Workshops',
          category: 'PROCESS',
          impact: 'HIGH_RISK',
          description: '65% of developers report unclear sprint priorities'
        },
        {
          id: '2',
          title: 'Async Communication Guidelines',
          category: 'COMMUNICATION',
          impact: 'NEEDS_ATTENTION',
          description: 'Lack of clear async communication protocols'
        },
        {
          id: '3',
          title: 'Cross-Team Dependency Delays',
          category: 'PROCESS',
          impact: 'NEEDS_ATTENTION',
          description: '35% of respondents report dependency issues'
        }
      ]
    }

    return NextResponse.json(dashboardData)
  } catch (error) {
    console.error('Dashboard error:', error)
    return NextResponse.json({ error: 'Error al obtener dashboard' }, { status: 500 })
  }
}
