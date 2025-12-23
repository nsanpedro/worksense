import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// GET - Obtener survey por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await getCurrentUser(request)
    
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const survey = await prisma.survey.findFirst({
      where: { 
        id,
        organizationId: user.organizationId 
      },
      include: {
        team: true,
        questions: { orderBy: { order: 'asc' } },
        responses: {
          include: {
            user: {
              select: { id: true, name: true, role: true, email: true }
            },
            answers: {
              include: {
                question: true
              }
            }
          }
        },
        insights: {
          include: {
            actions: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!survey) {
      return NextResponse.json({ error: 'Survey no encontrado' }, { status: 404 })
    }

    return NextResponse.json({ survey })
  } catch (error) {
    console.error('Get survey error:', error)
    return NextResponse.json({ error: 'Error al obtener survey' }, { status: 500 })
  }
}

// PUT - Actualizar survey
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await getCurrentUser(request)
    
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, status, deadline } = body

    // Verificar que el survey pertenece a la organización
    const existingSurvey = await prisma.survey.findFirst({
      where: { id, organizationId: user.organizationId }
    })

    if (!existingSurvey) {
      return NextResponse.json({ error: 'Survey no encontrado' }, { status: 404 })
    }

    const survey = await prisma.survey.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(status && { status }),
        ...(deadline !== undefined && { deadline: deadline ? new Date(deadline) : null }),
      },
      include: {
        questions: { orderBy: { order: 'asc' } },
        team: true
      }
    })

    return NextResponse.json({ survey })
  } catch (error) {
    console.error('Update survey error:', error)
    return NextResponse.json({ error: 'Error al actualizar survey' }, { status: 500 })
  }
}

// DELETE - Eliminar survey
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await getCurrentUser(request)
    
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    // Verificar que el survey pertenece a la organización
    const existingSurvey = await prisma.survey.findFirst({
      where: { id, organizationId: user.organizationId }
    })

    if (!existingSurvey) {
      return NextResponse.json({ error: 'Survey no encontrado' }, { status: 404 })
    }

    await prisma.survey.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete survey error:', error)
    return NextResponse.json({ error: 'Error al eliminar survey' }, { status: 500 })
  }
}
