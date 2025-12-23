import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// GET - Datos del dashboard
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    // Obtener último survey con análisis
    const latestSurvey = await prisma.survey.findFirst({
      where: { 
        organizationId: user.organizationId,
        status: 'COMPLETED'
      },
      include: {
        insights: {
          include: { actions: true }
        },
        _count: { select: { responses: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Obtener alignment score más reciente
    const latestScore = await prisma.alignmentScore.findFirst({
      where: { organizationId: user.organizationId },
      orderBy: { calculatedAt: 'desc' }
    })

    // Obtener historial de scores (últimos 6)
    const scoreHistory = await prisma.alignmentScore.findMany({
      where: { organizationId: user.organizationId },
      orderBy: { calculatedAt: 'desc' },
      take: 6
    })

    // Calcular trend
    const trend = scoreHistory.length >= 2 
      ? scoreHistory[0].score - scoreHistory[1].score 
      : 0

    // Obtener insights más recientes
    const recentInsights = await prisma.insight.findMany({
      where: {
        survey: { organizationId: user.organizationId }
      },
      include: { actions: true },
      orderBy: { createdAt: 'desc' },
      take: 5
    })

    // Obtener acciones pendientes
    const pendingActions = await prisma.action.findMany({
      where: {
        status: { in: ['SUGGESTED', 'PENDING', 'IN_PROGRESS'] },
        insight: {
          survey: { organizationId: user.organizationId }
        }
      },
      include: {
        insight: {
          select: { title: true, category: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    })

    // Estadísticas generales
    const stats = await prisma.$transaction([
      prisma.survey.count({ where: { organizationId: user.organizationId } }),
      prisma.surveyResponse.count({ 
        where: { survey: { organizationId: user.organizationId } } 
      }),
      prisma.user.count({ where: { organizationId: user.organizationId } }),
      prisma.team.count({ where: { organizationId: user.organizationId } })
    ])

    // Breakdown del último análisis
    let breakdown = null
    if (latestScore?.breakdown) {
      try {
        breakdown = JSON.parse(latestScore.breakdown)
      } catch {
        breakdown = null
      }
    }

    return NextResponse.json({
      alignmentScore: latestScore?.score || 0,
      trend,
      scoreHistory: scoreHistory.reverse().map(s => ({
        score: s.score,
        date: s.calculatedAt
      })),
      insights: recentInsights.map(i => ({
        id: i.id,
        category: i.category,
        title: i.title,
        description: i.description,
        impact: i.impact,
        actionsCount: i.actions.length
      })),
      pendingActions: pendingActions.map(a => ({
        id: a.id,
        title: a.title,
        description: a.description,
        ownerRole: a.ownerRole,
        status: a.status,
        progress: a.progress,
        insightTitle: a.insight.title
      })),
      topFrictions: breakdown?.topFrictions || [],
      rootCauses: breakdown?.rootCauses || [],
      stats: {
        totalSurveys: stats[0],
        totalResponses: stats[1],
        totalUsers: stats[2],
        totalTeams: stats[3]
      },
      latestSurvey: latestSurvey ? {
        id: latestSurvey.id,
        title: latestSurvey.title,
        status: latestSurvey.status,
        responsesCount: latestSurvey._count.responses
      } : null
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    return NextResponse.json({ error: 'Error al cargar dashboard' }, { status: 500 })
  }
}

