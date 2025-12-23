import OpenAI from 'openai'
import { Role } from '@prisma/client'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Tipos para el análisis
export interface SurveyResponseData {
  role: Role
  answers: {
    question: string
    questionType: string
    value: string
    numericValue?: number
  }[]
}

export interface AnalysisResult {
  alignmentScore: number
  insights: {
    category: 'ALIGNMENT' | 'RISK' | 'COMMUNICATION' | 'PROCESS' | 'STAKEHOLDER'
    title: string
    description: string
    impact: 'POSITIVE' | 'NEEDS_ATTENTION' | 'HIGH_RISK'
    confidence: number
  }[]
  suggestedActions: {
    title: string
    description: string
    ownerRole: Role
    priority: 'HIGH' | 'MEDIUM' | 'LOW'
  }[]
  narrativeSummary: string
  topFrictions: string[]
  rootCauses: string[]
}

// Prompt del sistema para análisis
const ANALYSIS_SYSTEM_PROMPT = `Eres un experto en dinámica de equipos de tecnología y alineamiento organizacional.
Tu trabajo es analizar las respuestas de encuestas de líderes de equipo (PM, EM, Tech Leads, Stakeholders) 
y generar insights accionables.

CONTEXTO IMPORTANTE:
- Las respuestas vienen de LÍDERES, no de todo el equipo
- Cada rol tiene una perspectiva diferente:
  * PM: Enfocado en roadmap, prioridades, delivery
  * EM: Enfocado en el equipo, burnout, capacidad técnica
  * TECH_LEAD: Enfocado en deuda técnica, arquitectura, calidad
  * STAKEHOLDER: Enfocado en valor de negocio, ROI, expectativas (suelen ser los más difíciles de alinear)

PRESTA ESPECIAL ATENCIÓN A:
1. Desalineación entre roles (ej: PM dice que las prioridades están claras, pero STAKEHOLDER no está de acuerdo)
2. Señales de burnout o sobrecarga
3. Fricción con stakeholders (muy común y crítico)
4. Problemas de comunicación cross-funcional
5. Scope creep y cambios de último momento

Responde SIEMPRE en formato JSON válido.`

// Analizar respuestas de una encuesta
export async function analyzeSurveyResponses(
  surveyTitle: string,
  responses: SurveyResponseData[]
): Promise<AnalysisResult> {
  const prompt = `
Analiza las siguientes respuestas de la encuesta "${surveyTitle}":

${responses.map(r => `
=== RESPUESTAS DEL ROL: ${r.role} ===
${r.answers.map(a => `
Pregunta: ${a.question}
Tipo: ${a.questionType}
Respuesta: ${a.value}${a.numericValue ? ` (Score: ${a.numericValue}/10)` : ''}
`).join('\n')}
`).join('\n')}

Genera un análisis completo en el siguiente formato JSON:
{
  "alignmentScore": <número 0-100>,
  "insights": [
    {
      "category": "<ALIGNMENT|RISK|COMMUNICATION|PROCESS|STAKEHOLDER>",
      "title": "<título corto>",
      "description": "<descripción detallada>",
      "impact": "<POSITIVE|NEEDS_ATTENTION|HIGH_RISK>",
      "confidence": <0.0-1.0>
    }
  ],
  "suggestedActions": [
    {
      "title": "<acción concreta>",
      "description": "<cómo implementarla>",
      "ownerRole": "<PM|EM|TECH_LEAD|STAKEHOLDER>",
      "priority": "<HIGH|MEDIUM|LOW>"
    }
  ],
  "narrativeSummary": "<resumen narrativo de 2-3 oraciones>",
  "topFrictions": ["<fricción 1>", "<fricción 2>", ...],
  "rootCauses": ["<causa raíz 1>", "<causa raíz 2>", ...]
}

IMPORTANTE: 
- Genera al menos 3 insights
- Genera al menos 2 acciones sugeridas
- Sé específico y accionable
- Si hay desalineación entre roles, destácala
`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Más económico para MVP
      messages: [
        { role: 'system', content: ANALYSIS_SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) throw new Error('No response from OpenAI')

    return JSON.parse(content) as AnalysisResult
  } catch (error) {
    console.error('OpenAI analysis error:', error)
    // Retornar un análisis por defecto si falla
    return getDefaultAnalysis()
  }
}

// Generar preguntas con IA
export async function generateSurveyQuestions(
  context: string,
  targetRoles: Role[],
  questionCount: number = 5
): Promise<{ question: string; targetRole: Role | null; type: 'SCALE' | 'TEXT' }[]> {
  const prompt = `
Genera ${questionCount} preguntas para una encuesta de alineamiento de equipo.

Contexto del equipo/situación: ${context}

Roles que responderán: ${targetRoles.join(', ')}

Requisitos:
- Preguntas cortas y directas
- Mezcla de preguntas de escala (1-10) y texto libre
- Algunas preguntas específicas por rol, otras generales
- Enfócate en detectar: alineamiento, burnout, fricción con stakeholders, comunicación

Responde en formato JSON:
{
  "questions": [
    {
      "question": "<texto de la pregunta>",
      "targetRole": "<PM|EM|TECH_LEAD|STAKEHOLDER|null para todos>",
      "type": "<SCALE|TEXT>"
    }
  ]
}
`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Eres un experto en diseño de encuestas organizacionales. Genera preguntas claras y accionables.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) throw new Error('No response from OpenAI')

    const result = JSON.parse(content)
    return result.questions
  } catch (error) {
    console.error('OpenAI question generation error:', error)
    return getDefaultQuestions(targetRoles)
  }
}

// Análisis por defecto si OpenAI falla
function getDefaultAnalysis(): AnalysisResult {
  return {
    alignmentScore: 50,
    insights: [
      {
        category: 'ALIGNMENT',
        title: 'Análisis pendiente',
        description: 'No se pudo completar el análisis automático. Revisa las respuestas manualmente.',
        impact: 'NEEDS_ATTENTION',
        confidence: 0.5
      }
    ],
    suggestedActions: [
      {
        title: 'Revisar respuestas manualmente',
        description: 'El análisis automático no está disponible. Revisa las respuestas individuales.',
        ownerRole: 'PM',
        priority: 'MEDIUM'
      }
    ],
    narrativeSummary: 'El análisis automático no pudo completarse. Por favor revisa las respuestas manualmente.',
    topFrictions: [],
    rootCauses: []
  }
}

// Preguntas por defecto por rol
function getDefaultQuestions(roles: Role[]) {
  const questions: { question: string; targetRole: Role | null; type: 'SCALE' | 'TEXT' }[] = [
    // Generales
    {
      question: '¿Qué tan alineado te sientes con las prioridades actuales del equipo?',
      targetRole: null,
      type: 'SCALE'
    },
    {
      question: '¿Qué tan claros están los objetivos del trimestre?',
      targetRole: null,
      type: 'SCALE'
    },
    // Por rol
    {
      question: '¿Cómo calificarías la comunicación con los stakeholders?',
      targetRole: 'PM',
      type: 'SCALE'
    },
    {
      question: '¿Detectas señales de burnout en tu equipo?',
      targetRole: 'EM',
      type: 'SCALE'
    },
    {
      question: '¿Cuál es el mayor punto de fricción en tu trabajo diario?',
      targetRole: null,
      type: 'TEXT'
    }
  ]
  
  return questions.filter(q => q.targetRole === null || roles.includes(q.targetRole))
}

// Preguntas predefinidas por rol (para usar sin OpenAI)
export const PREDEFINED_QUESTIONS: Record<Role | 'ALL', { question: string; type: 'SCALE' | 'TEXT' }[]> = {
  ALL: [
    { question: '¿Qué tan alineado te sientes con las prioridades actuales del equipo?', type: 'SCALE' },
    { question: '¿Qué tan claros están los objetivos del trimestre para vos?', type: 'SCALE' },
    { question: '¿Cuál es el mayor punto de fricción en tu trabajo diario?', type: 'TEXT' },
  ],
  PM: [
    { question: '¿Qué tan bien comunicados están los cambios de roadmap a todos los stakeholders?', type: 'SCALE' },
    { question: '¿Sientes que hay scope creep frecuente en los sprints?', type: 'SCALE' },
    { question: '¿Qué mejorarías de la comunicación con stakeholders?', type: 'TEXT' },
  ],
  EM: [
    { question: '¿Detectas señales de burnout o sobrecarga en tu equipo?', type: 'SCALE' },
    { question: '¿Qué tan balanceada está la carga de trabajo entre los miembros?', type: 'SCALE' },
    { question: '¿Qué necesita tu equipo para trabajar mejor?', type: 'TEXT' },
  ],
  TECH_LEAD: [
    { question: '¿Qué tan manejable es la deuda técnica actual?', type: 'SCALE' },
    { question: '¿Hay tiempo suficiente para tareas de calidad y refactoring?', type: 'SCALE' },
    { question: '¿Qué riesgos técnicos te preocupan más?', type: 'TEXT' },
  ],
  STAKEHOLDER: [
    { question: '¿Qué tan satisfecho estás con el progreso del equipo?', type: 'SCALE' },
    { question: '¿Sientes que tus prioridades son entendidas y respetadas?', type: 'SCALE' },
    { question: '¿Qué expectativas no se están cumpliendo actualmente?', type: 'TEXT' },
  ],
  ADMIN: [
    { question: '¿Cómo evaluarías la salud general del equipo?', type: 'SCALE' },
    { question: '¿Qué cambios organizacionales priorizarías?', type: 'TEXT' },
  ],
}

