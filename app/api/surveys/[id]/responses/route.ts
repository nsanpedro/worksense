import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// POST - Enviar respuesta a survey
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

    const body = await request.json()
    const { answers } = body // Array de { questionId, value }

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'Respuestas requeridas' }, { status: 400 })
    }

    // Verificar que el survey existe y está activo
    const survey = await prisma.survey.findFirst({
      where: { 
        id: surveyId,
        status: 'ACTIVE'
      },
      include: {
        questions: true
      }
    })

    if (!survey) {
      return NextResponse.json({ error: 'Survey no encontrado o no activo' }, { status: 404 })
    }

    // Verificar si el usuario ya respondió
    const existingResponse = await prisma.surveyResponse.findFirst({
      where: { userId: user.id, surveyId }
    })

    if (existingResponse) {
      return NextResponse.json({ error: 'Ya respondiste esta encuesta' }, { status: 400 })
    }

    // Filtrar preguntas aplicables al rol del usuario
    const applicableQuestions = survey.questions.filter(
      q => q.targetRole === null || q.targetRole === user.role
    )

    // Crear respuesta
    const response = await prisma.surveyResponse.create({
      data: {
        userId: user.id,
        surveyId,
        answers: {
          create: answers
            .filter((a: { questionId: string }) => 
              applicableQuestions.some(q => q.id === a.questionId)
            )
            .map((a: { questionId: string; value: string }) => {
              const question = applicableQuestions.find(q => q.id === a.questionId)
              return {
                questionId: a.questionId,
                value: a.value,
                numericValue: question?.type === 'SCALE' ? parseInt(a.value) || null : null
              }
            })
        }
      },
      include: {
        answers: {
          include: { question: true }
        }
      }
    })

    return NextResponse.json({ response }, { status: 201 })
  } catch (error) {
    console.error('Submit response error:', error)
    return NextResponse.json({ error: 'Error al enviar respuesta' }, { status: 500 })
  }
}

// GET - Obtener respuestas de un survey
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: surveyId } = await params
    const user = await getCurrentUser(request)
    
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const responses = await prisma.surveyResponse.findMany({
      where: { surveyId },
      include: {
        user: {
          select: { id: true, name: true, role: true, email: true }
        },
        answers: {
          include: { question: true }
        }
      },
      orderBy: { submittedAt: 'desc' }
    })

    return NextResponse.json({ responses })
  } catch (error) {
    console.error('Get responses error:', error)
    return NextResponse.json({ error: 'Error al obtener respuestas' }, { status: 500 })
  }
}
