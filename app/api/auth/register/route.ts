import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateToken } from '@/lib/auth'
import { Role } from '@/types/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, role, organizationName, teamName } = body

    // Validaciones básicas
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password y nombre son requeridos' },
        { status: 400 }
      )
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 400 }
      )
    }

    // Hash del password
    const hashedPassword = await hashPassword(password)

    // Crear organización si es necesario
    let organization = await prisma.organization.findFirst({
      where: { name: organizationName || 'Mi Organización' }
    })

    if (!organization) {
      const slug = (organizationName || 'mi-organizacion')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      
      organization = await prisma.organization.create({
        data: {
          name: organizationName || 'Mi Organización',
          slug: `${slug}-${Date.now()}`,
        }
      })
    }

    // Crear team si se especifica
    let team = null
    if (teamName) {
      team = await prisma.team.create({
        data: {
          name: teamName,
          organizationId: organization.id,
        }
      })
    }

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: (role as Role) || 'PM',
        organizationId: organization.id,
        teamId: team?.id,
      },
      include: {
        organization: true,
        team: true,
      }
    })

    // Generar token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
    })

    // Crear response con cookie
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        organization: user.organization,
        team: user.team,
      },
      token,
    })

    // Set cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 días
    })

    return response
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Error al registrar usuario' },
      { status: 500 }
    )
  }
}
