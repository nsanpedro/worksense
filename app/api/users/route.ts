import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser, hashPassword } from '@/lib/auth'
import { Role } from '@/types/database'

// GET - Listar usuarios de la organización
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const users = await prisma.user.findMany({
      where: { organizationId: user.organizationId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        team: true,
        createdAt: true
      },
      orderBy: { name: 'asc' }
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json({ error: 'Error al obtener usuarios' }, { status: 500 })
  }
}

// POST - Crear/invitar usuario
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    // Solo admins pueden crear usuarios
    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const body = await request.json()
    const { email, name, role, teamId, password } = body

    if (!email || !name || !role) {
      return NextResponse.json(
        { error: 'Email, nombre y rol son requeridos' }, 
        { status: 400 }
      )
    }

    // Verificar que el email no exista
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'El email ya existe' }, { status: 400 })
    }

    // Crear usuario con password temporal
    const tempPassword = password || `temp-${Date.now()}`
    const hashedPassword = await hashPassword(tempPassword)

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: role as Role,
        organizationId: user.organizationId,
        teamId: teamId || null
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        team: true
      }
    })

    return NextResponse.json({ 
      user: newUser,
      tempPassword: password ? undefined : tempPassword // Solo retornar si fue generado
    }, { status: 201 })
  } catch (error) {
    console.error('Create user error:', error)
    return NextResponse.json({ error: 'Error al crear usuario' }, { status: 500 })
  }
}

