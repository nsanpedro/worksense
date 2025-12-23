import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Limpiar datos existentes
  await prisma.action.deleteMany()
  await prisma.insight.deleteMany()
  await prisma.alignmentScore.deleteMany()
  await prisma.answer.deleteMany()
  await prisma.surveyResponse.deleteMany()
  await prisma.question.deleteMany()
  await prisma.survey.deleteMany()
  await prisma.user.deleteMany()
  await prisma.team.deleteMany()
  await prisma.organization.deleteMany()

  // Crear organización demo
  const org = await prisma.organization.create({
    data: {
      name: 'WorkSense Demo',
      slug: 'worksense-demo',
    }
  })
  console.log('✅ Organización creada:', org.name)

  // Crear team
  const team = await prisma.team.create({
    data: {
      name: 'Product Team Alpha',
      organizationId: org.id,
    }
  })
  console.log('✅ Team creado:', team.name)

  // Crear usuarios de prueba con diferentes roles
  const password = await bcrypt.hash('demo123', 12)
  
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@worksense.demo',
        name: 'Admin User',
        password,
        role: 'ADMIN',
        organizationId: org.id,
        teamId: team.id,
      }
    }),
    prisma.user.create({
      data: {
        email: 'pm@worksense.demo',
        name: 'Paula Martinez (PM)',
        password,
        role: 'PM',
        organizationId: org.id,
        teamId: team.id,
      }
    }),
    prisma.user.create({
      data: {
        email: 'em@worksense.demo',
        name: 'Eduardo Mendez (EM)',
        password,
        role: 'EM',
        organizationId: org.id,
        teamId: team.id,
      }
    }),
    prisma.user.create({
      data: {
        email: 'techlead@worksense.demo',
        name: 'Teresa Lopez (Tech Lead)',
        password,
        role: 'TECH_LEAD',
        organizationId: org.id,
        teamId: team.id,
      }
    }),
    prisma.user.create({
      data: {
        email: 'stakeholder@worksense.demo',
        name: 'Santiago Herrera (Stakeholder)',
        password,
        role: 'STAKEHOLDER',
        organizationId: org.id,
        teamId: team.id,
      }
    }),
  ])
  console.log('✅ Usuarios creados:', users.length)

  // Crear survey de ejemplo
  const survey = await prisma.survey.create({
    data: {
      title: 'Octubre 2025 - Team Alignment Survey',
      description: 'Encuesta mensual para evaluar la alineación del equipo',
      status: 'COMPLETED',
      organizationId: org.id,
      teamId: team.id,
    }
  })
  console.log('✅ Survey creado:', survey.title)

  // Crear preguntas
  const questions = await Promise.all([
    // Generales
    prisma.question.create({
      data: {
        surveyId: survey.id,
        text: '¿Qué tan alineado te sientes con las prioridades actuales del equipo?',
        type: 'SCALE',
        targetRole: null,
        order: 0
      }
    }),
    prisma.question.create({
      data: {
        surveyId: survey.id,
        text: '¿Qué tan claros están los objetivos del trimestre para vos?',
        type: 'SCALE',
        targetRole: null,
        order: 1
      }
    }),
    // Por rol
    prisma.question.create({
      data: {
        surveyId: survey.id,
        text: '¿Qué tan bien comunicados están los cambios de roadmap a todos los stakeholders?',
        type: 'SCALE',
        targetRole: 'PM',
        order: 2
      }
    }),
    prisma.question.create({
      data: {
        surveyId: survey.id,
        text: '¿Detectas señales de burnout o sobrecarga en tu equipo?',
        type: 'SCALE',
        targetRole: 'EM',
        order: 3
      }
    }),
    prisma.question.create({
      data: {
        surveyId: survey.id,
        text: '¿Qué tan manejable es la deuda técnica actual?',
        type: 'SCALE',
        targetRole: 'TECH_LEAD',
        order: 4
      }
    }),
    prisma.question.create({
      data: {
        surveyId: survey.id,
        text: '¿Sientes que tus prioridades son entendidas y respetadas?',
        type: 'SCALE',
        targetRole: 'STAKEHOLDER',
        order: 5
      }
    }),
    // Texto libre
    prisma.question.create({
      data: {
        surveyId: survey.id,
        text: '¿Cuál es el mayor punto de fricción en tu trabajo diario?',
        type: 'TEXT',
        targetRole: null,
        order: 6
      }
    }),
  ])
  console.log('✅ Preguntas creadas:', questions.length)

  // Crear respuestas de ejemplo
  const responseData = [
    {
      user: users[1], // PM
      answers: [
        { questionIdx: 0, value: '6', numeric: 6 },
        { questionIdx: 1, value: '7', numeric: 7 },
        { questionIdx: 2, value: '5', numeric: 5 },
        { questionIdx: 6, value: 'El scope creep constante de los stakeholders hace difícil mantener el roadmap' },
      ]
    },
    {
      user: users[2], // EM
      answers: [
        { questionIdx: 0, value: '5', numeric: 5 },
        { questionIdx: 1, value: '6', numeric: 6 },
        { questionIdx: 3, value: '7', numeric: 7 },
        { questionIdx: 6, value: 'El equipo está mostrando signos de fatiga, necesitamos mejor balance de carga' },
      ]
    },
    {
      user: users[3], // Tech Lead
      answers: [
        { questionIdx: 0, value: '6', numeric: 6 },
        { questionIdx: 1, value: '5', numeric: 5 },
        { questionIdx: 4, value: '4', numeric: 4 },
        { questionIdx: 6, value: 'La deuda técnica se está acumulando, no hay tiempo para refactoring' },
      ]
    },
    {
      user: users[4], // Stakeholder
      answers: [
        { questionIdx: 0, value: '4', numeric: 4 },
        { questionIdx: 1, value: '4', numeric: 4 },
        { questionIdx: 5, value: '5', numeric: 5 },
        { questionIdx: 6, value: 'Siento que mis prioridades no siempre son entendidas o tomadas en cuenta' },
      ]
    },
  ]

  for (const rd of responseData) {
    const response = await prisma.surveyResponse.create({
      data: {
        userId: rd.user.id,
        surveyId: survey.id,
      }
    })

    for (const answer of rd.answers) {
      await prisma.answer.create({
        data: {
          responseId: response.id,
          questionId: questions[answer.questionIdx].id,
          value: answer.value,
          numericValue: answer.numeric || null,
        }
      })
    }
  }
  console.log('✅ Respuestas creadas')

  // Crear insights de ejemplo
  const insights = await Promise.all([
    prisma.insight.create({
      data: {
        surveyId: survey.id,
        category: 'ALIGNMENT',
        title: 'Mejora en alineación del equipo',
        description: 'El score de alineación aumentó 5 puntos respecto al mes anterior, impulsado por objetivos de sprint más claros.',
        impact: 'POSITIVE',
        confidence: 0.85,
      }
    }),
    prisma.insight.create({
      data: {
        surveyId: survey.id,
        category: 'RISK',
        title: 'Indicadores de burnout detectados',
        description: 'Múltiples miembros del equipo reportaron niveles elevados de estrés. Se recomienda revisar la distribución de carga.',
        impact: 'HIGH_RISK',
        confidence: 0.9,
      }
    }),
    prisma.insight.create({
      data: {
        surveyId: survey.id,
        category: 'STAKEHOLDER',
        title: 'Fricción con stakeholders',
        description: 'Los stakeholders sienten que sus prioridades no son completamente entendidas. Hay una desconexión entre expectativas y delivery.',
        impact: 'NEEDS_ATTENTION',
        confidence: 0.82,
      }
    }),
    prisma.insight.create({
      data: {
        surveyId: survey.id,
        category: 'PROCESS',
        title: 'Scope creep sigue siendo una preocupación',
        description: '40% de los encuestados mencionaron cambios de alcance de último momento como su mayor punto de fricción.',
        impact: 'NEEDS_ATTENTION',
        confidence: 0.88,
      }
    }),
  ])
  console.log('✅ Insights creados:', insights.length)

  // Crear acciones sugeridas
  await Promise.all([
    prisma.action.create({
      data: {
        insightId: insights[1].id,
        title: 'Team Wellness Check-in',
        description: 'Programar 1-on-1s con los miembros del equipo que muestran indicadores de burnout.',
        ownerRole: 'EM',
        status: 'IN_PROGRESS',
        progress: 60,
      }
    }),
    prisma.action.create({
      data: {
        insightId: insights[2].id,
        title: 'Workshop de Alineación con Stakeholders',
        description: 'Organizar un workshop de priorización con todos los stakeholders para alinear expectativas.',
        ownerRole: 'PM',
        status: 'SUGGESTED',
        progress: 0,
      }
    }),
    prisma.action.create({
      data: {
        insightId: insights[3].id,
        title: 'Implementar Scope Freeze Policy',
        description: 'Establecer una política de congelamiento de scope 48hs antes del inicio del sprint.',
        ownerRole: 'PM',
        status: 'PENDING',
        progress: 0,
      }
    }),
  ])
  console.log('✅ Acciones creadas')

  // Crear alignment score
  await prisma.alignmentScore.create({
    data: {
      surveyId: survey.id,
      organizationId: org.id,
      teamId: team.id,
      score: 58,
      breakdown: JSON.stringify({
        topFrictions: [
          'Scope creep en sprint planning',
          'Prioridades trimestrales poco claras',
          'Patrones de comunicación reactiva',
          'Delays por dependencias cross-team'
        ],
        rootCauses: [
          'Los equipos carecen de un framework compartido para priorización',
          'La comunicación defaultea a canales ad-hoc en lugar de check-ins estructurados',
          'Los ajustes de roadmap no se comunican transparentemente a todos los stakeholders'
        ]
      })
    }
  })
  console.log('✅ Alignment score creado')

  console.log('')
  console.log('🎉 Seed completado!')
  console.log('')
  console.log('👤 Usuarios de prueba:')
  console.log('   Email: admin@worksense.demo | Password: demo123 | Rol: ADMIN')
  console.log('   Email: pm@worksense.demo | Password: demo123 | Rol: PM')
  console.log('   Email: em@worksense.demo | Password: demo123 | Rol: EM')
  console.log('   Email: techlead@worksense.demo | Password: demo123 | Rol: TECH_LEAD')
  console.log('   Email: stakeholder@worksense.demo | Password: demo123 | Rol: STAKEHOLDER')
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

