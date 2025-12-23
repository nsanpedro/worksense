import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { analyzeSurveyResponses, SurveyResponseData } from '@/lib/openai'

// POST - Analizar respuestas con OpenAI
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: surveyId } = await params
    const user = await getCurrentUser(request)
    
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    // Obtener survey con todas las respuestas
    const survey = await prisma.survey.findFirst({
      where: { 
        id: surveyId,
        organizationId: user.organizationId 
      },
      include: {
        questions: true,
        responses: {
          include: {
            user: {
              select: { role: true }
            },
            answers: {
              include: { question: true }
            }
          }
        }
      }
    })

    if (!survey) {
      return NextResponse.json({ error: 'Survey no encontrado' }, { status: 404 })
    }

    if (survey.responses.length === 0) {
      return NextResponse.json({ error: 'No hay respuestas para analizar' }, { status: 400 })
    }

    // Preparar datos para OpenAI
    const responseData: SurveyResponseData[] = survey.responses.map(r => ({
      role: r.user.role,
      answers: r.answers.map(a => ({
        question: a.question.text,
        questionType: a.question.type,
        value: a.value,
        numericValue: a.numericValue || undefined
      }))
    }))

    // Llamar a OpenAI para análisis
    const analysis = await analyzeSurveyResponses(survey.title, responseData)

    // Guardar insights en la DB
    const createdInsights = []
    for (const insight of analysis.insights) {
      const created = await prisma.insight.create({
        data: {
          surveyId,
          category: insight.category,
          title: insight.title,
          description: insight.description,
          impact: insight.impact,
          confidence: insight.confidence,
          rawAnalysis: JSON.stringify(analysis)
        }
      })
      createdInsights.push(created)
    }

    // Guardar acciones sugeridas
    for (const action of analysis.suggestedActions) {
      // Asociar cada acción al primer insight relevante
      const relatedInsight = createdInsights[0]
      if (relatedInsight) {
        await prisma.action.create({
          data: {
            insightId: relatedInsight.id,
            title: action.title,
            description: action.description,
            ownerRole: action.ownerRole,
            status: 'SUGGESTED'
          }
        })
      }
    }

    // Guardar alignment score
    await prisma.alignmentScore.upsert({
      where: { surveyId },
      create: {
        surveyId,
        organizationId: user.organizationId,
        teamId: survey.teamId,
        score: analysis.alignmentScore,
        breakdown: JSON.stringify({
          topFrictions: analysis.topFrictions,
          rootCauses: analysis.rootCauses
        })
      },
      update: {
        score: analysis.alignmentScore,
        breakdown: JSON.stringify({
          topFrictions: analysis.topFrictions,
          rootCauses: analysis.rootCauses
        })
      }
    })

    // Actualizar estado del survey si tenemos análisis
    await prisma.survey.update({
      where: { id: surveyId },
      data: { status: 'COMPLETED' }
    })

    return NextResponse.json({ 
      analysis,
      insightsCount: createdInsights.length,
      message: 'Análisis completado exitosamente'
    })
  } catch (error) {
    console.error('Analyze survey error:', error)
    return NextResponse.json({ error: 'Error al analizar survey' }, { status: 500 })
  }
}

