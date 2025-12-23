import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { analyzeSurveyResponses, SurveyResponseData } from '@/lib/openai'
import { Role } from '@prisma/client'

// POST - Analizar respuestas manualmente (sin survey en DB)
// Útil para demos o análisis rápido
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const body = await request.json()
    const { surveyTitle, responses } = body

    if (!surveyTitle || !responses || !Array.isArray(responses)) {
      return NextResponse.json(
        { error: 'surveyTitle y responses son requeridos' }, 
        { status: 400 }
      )
    }

    // Validar formato de responses
    const validResponses: SurveyResponseData[] = responses.map((r: {
      role: Role
      answers: { question: string; questionType: string; value: string; numericValue?: number }[]
    }) => ({
      role: r.role,
      answers: r.answers.map(a => ({
        question: a.question,
        questionType: a.questionType || 'SCALE',
        value: a.value,
        numericValue: a.numericValue
      }))
    }))

    // Llamar a OpenAI para análisis
    const analysis = await analyzeSurveyResponses(surveyTitle, validResponses)

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error('Analyze error:', error)
    return NextResponse.json({ error: 'Error al analizar' }, { status: 500 })
  }
}
