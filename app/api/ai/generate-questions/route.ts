import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { generateSurveyQuestions, PREDEFINED_QUESTIONS } from '@/lib/openai'
import { Role } from '@prisma/client'

// POST - Generar preguntas con IA
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      context = 'Equipo de tecnología trabajando en un producto SaaS',
      targetRoles = ['PM', 'EM', 'TECH_LEAD', 'STAKEHOLDER'],
      questionCount = 5,
      useAI = false // Por defecto usar preguntas predefinidas (más económico)
    } = body

    let questions

    if (useAI && process.env.OPENAI_API_KEY) {
      // Generar con OpenAI
      questions = await generateSurveyQuestions(context, targetRoles as Role[], questionCount)
    } else {
      // Usar preguntas predefinidas
      questions = []
      
      // Agregar preguntas generales
      for (const q of PREDEFINED_QUESTIONS.ALL.slice(0, 2)) {
        questions.push({
          question: q.question,
          targetRole: null,
          type: q.type
        })
      }
      
      // Agregar 1 pregunta por cada rol target
      for (const role of targetRoles as Role[]) {
        const roleQuestions = PREDEFINED_QUESTIONS[role]
        if (roleQuestions && roleQuestions.length > 0) {
          questions.push({
            question: roleQuestions[0].question,
            targetRole: role,
            type: roleQuestions[0].type
          })
        }
      }

      // Agregar pregunta de texto libre
      questions.push({
        question: '¿Cuál es el mayor punto de fricción en tu trabajo diario?',
        targetRole: null,
        type: 'TEXT'
      })
    }

    return NextResponse.json({ questions })
  } catch (error) {
    console.error('Generate questions error:', error)
    return NextResponse.json({ error: 'Error al generar preguntas' }, { status: 500 })
  }
}
