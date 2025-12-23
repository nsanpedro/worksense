import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { PREDEFINED_QUESTIONS } from '@/lib/openai'
import { Role } from '@prisma/client'

// GET - Listar surveys de la organización
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const surveys = await prisma.survey.findMany({
      where: { organizationId: user.organizationId },
      include: {
        team: true,
        questions: true,
        responses: {
          include: {
            user: {
              select: { id: true, name: true, role: true }
            }
          }
        },
        _count: {
          select: { responses: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ surveys })
  } catch (error) {
    console.error('Get surveys error:', error)
    return NextResponse.json({ error: 'Error al obtener surveys' }, { status: 500 })
  }
}

// POST - Crear nuevo survey
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      title, 
      description, 
      teamId, 
      deadline,
      targetRoles = ['PM', 'EM', 'TECH_LEAD', 'STAKEHOLDER'],
      customQuestions,
      useDefaultQuestions = true
    } = body

    if (!title) {
      return NextResponse.json({ error: 'El título es requerido' }, { status: 400 })
    }

    // Crear survey
    const survey = await prisma.survey.create({
      data: {
        title,
        description,
        organizationId: user.organizationId,
        teamId,
        deadline: deadline ? new Date(deadline) : null,
        status: 'DRAFT',
      }
    })

    // Generar preguntas
    const questionsToCreate: { text: string; type: 'SCALE' | 'TEXT'; targetRole: Role | null; order: number }[] = []
    let order = 0

    if (useDefaultQuestions) {
      // Agregar preguntas generales
      for (const q of PREDEFINED_QUESTIONS.ALL) {
        questionsToCreate.push({
          text: q.question,
          type: q.type,
          targetRole: null,
          order: order++
        })
      }

      // Agregar preguntas específicas por rol
      for (const role of targetRoles as Role[]) {
        const roleQuestions = PREDEFINED_QUESTIONS[role] || []
        for (const q of roleQuestions.slice(0, 2)) { // Max 2 preguntas por rol
          questionsToCreate.push({
            text: q.question,
            type: q.type,
            targetRole: role,
            order: order++
          })
        }
      }
    }

    // Agregar preguntas custom si existen
    if (customQuestions && Array.isArray(customQuestions)) {
      for (const q of customQuestions) {
        questionsToCreate.push({
          text: q.text,
          type: q.type || 'SCALE',
          targetRole: q.targetRole || null,
          order: order++
        })
      }
    }

    // Crear preguntas en la DB
    if (questionsToCreate.length > 0) {
      await prisma.question.createMany({
        data: questionsToCreate.map(q => ({
          ...q,
          surveyId: survey.id
        }))
      })
    }

    // Retornar survey con preguntas
    const surveyWithQuestions = await prisma.survey.findUnique({
      where: { id: survey.id },
      include: {
        questions: { orderBy: { order: 'asc' } },
        team: true
      }
    })

    return NextResponse.json({ survey: surveyWithQuestions }, { status: 201 })
  } catch (error) {
    console.error('Create survey error:', error)
    return NextResponse.json({ error: 'Error al crear survey' }, { status: 500 })
  }
}
