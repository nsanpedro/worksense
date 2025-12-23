import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET - Listar teams de la organización
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const teams = await prisma.team.findMany({
      where: { organizationId: user.organizationId },
      include: {
        members: {
          select: { id: true, name: true, email: true, role: true },
        },
        _count: {
          select: { surveys: true, members: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ teams });
  } catch (error) {
    console.error('Get teams error:', error);
    return NextResponse.json(
      { error: 'Error al obtener teams' },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo team
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'El nombre es requerido' },
        { status: 400 }
      );
    }

    const team = await prisma.team.create({
      data: {
        name,
        organizationId: user.organizationId,
      },
      include: {
        members: true,
      },
    });

    return NextResponse.json({ team }, { status: 201 });
  } catch (error) {
    console.error('Create team error:', error);
    return NextResponse.json({ error: 'Error al crear team' }, { status: 500 });
  }
}
