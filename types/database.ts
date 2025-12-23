// Tipos locales que espejean los enums de Prisma
// Esto evita problemas de build cuando prisma generate no se ejecuta correctamente

export type Role = 'ADMIN' | 'PM' | 'EM' | 'TECH_LEAD' | 'STAKEHOLDER'

export type SurveyStatus = 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'ARCHIVED'

export type QuestionType = 'SCALE' | 'TEXT' | 'CHOICE'

export type InsightCategory = 'ALIGNMENT' | 'RISK' | 'COMMUNICATION' | 'PROCESS' | 'STAKEHOLDER'

export type InsightImpact = 'POSITIVE' | 'NEEDS_ATTENTION' | 'HIGH_RISK'

export type ActionStatus = 'SUGGESTED' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'DISMISSED'

