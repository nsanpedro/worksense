// Datos de demo para que la app funcione sin base de datos
// Password para todos: demo123

import { Role } from '@/types/database'

export interface DemoUser {
  id: string
  email: string
  name: string
  password: string // En producción real esto sería un hash
  role: Role
  organizationId: string
  teamId: string
  organization: {
    id: string
    name: string
    slug: string
  }
  team: {
    id: string
    name: string
  }
}

export const DEMO_ORGANIZATION = {
  id: 'org-demo-001',
  name: 'WorkSense Demo',
  slug: 'worksense-demo',
}

export const DEMO_TEAM = {
  id: 'team-demo-001',
  name: 'Product Team Alpha',
}

export const DEMO_USERS: DemoUser[] = [
  {
    id: 'user-pm-001',
    email: 'pm@worksense.demo',
    name: 'María García',
    password: 'demo123',
    role: 'PM',
    organizationId: DEMO_ORGANIZATION.id,
    teamId: DEMO_TEAM.id,
    organization: DEMO_ORGANIZATION,
    team: DEMO_TEAM,
  },
  {
    id: 'user-em-001',
    email: 'em@worksense.demo',
    name: 'Carlos López',
    password: 'demo123',
    role: 'EM',
    organizationId: DEMO_ORGANIZATION.id,
    teamId: DEMO_TEAM.id,
    organization: DEMO_ORGANIZATION,
    team: DEMO_TEAM,
  },
  {
    id: 'user-tech-001',
    email: 'tech@worksense.demo',
    name: 'Ana Rodríguez',
    password: 'demo123',
    role: 'TECH_LEAD',
    organizationId: DEMO_ORGANIZATION.id,
    teamId: DEMO_TEAM.id,
    organization: DEMO_ORGANIZATION,
    team: DEMO_TEAM,
  },
  {
    id: 'user-stakeholder-001',
    email: 'stakeholder@worksense.demo',
    name: 'Roberto Sánchez',
    password: 'demo123',
    role: 'STAKEHOLDER',
    organizationId: DEMO_ORGANIZATION.id,
    teamId: DEMO_TEAM.id,
    organization: DEMO_ORGANIZATION,
    team: DEMO_TEAM,
  },
  {
    id: 'user-admin-001',
    email: 'admin@worksense.demo',
    name: 'Admin User',
    password: 'demo123',
    role: 'ADMIN',
    organizationId: DEMO_ORGANIZATION.id,
    teamId: DEMO_TEAM.id,
    organization: DEMO_ORGANIZATION,
    team: DEMO_TEAM,
  },
]

// Helper para buscar usuario por email
export function findDemoUserByEmail(email: string): DemoUser | undefined {
  return DEMO_USERS.find(u => u.email === email)
}

// Helper para buscar usuario por ID
export function findDemoUserById(id: string): DemoUser | undefined {
  return DEMO_USERS.find(u => u.id === id)
}

// Verificar password (simple para demo)
export function verifyDemoPassword(password: string, user: DemoUser): boolean {
  return password === user.password
}

