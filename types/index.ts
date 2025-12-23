// User types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: "admin" | "manager" | "member"
  organizationId: string
}

// Survey types
export interface Survey {
  id: string
  title: string
  description?: string
  status: "draft" | "active" | "completed"
  questions: Question[]
  responses: number
  totalInvited: number
  deadline?: string
  createdAt: string
  updatedAt?: string
}

export interface Question {
  id: string
  text: string
  type: "scale" | "text" | "multiple_choice"
  options?: string[]
  required?: boolean
}

export interface SurveyResponse {
  id: string
  surveyId: string
  answers: Record<string, string | number>
  anonymous: boolean
  submittedAt: string
}

// Insight types
export interface Insight {
  id: string
  category: "alignment" | "risk" | "communication" | "process"
  title: string
  description: string
  confidence: number
  sentiment: "positive" | "negative" | "neutral"
  createdAt: string
}

// Action types
export interface Action {
  id: string
  title: string
  description: string
  owner: string
  ownerType: "PM" | "EM" | "Stakeholder" | "Team"
  dueDate: string
  status: "pending" | "in_progress" | "completed" | "cancelled"
  priority: "low" | "medium" | "high" | "urgent"
  progress: number
  createdAt: string
}

// Organization types
export interface Organization {
  id: string
  name: string
  teamSize: number
  settings: OrganizationSettings
  createdAt: string
}

export interface OrganizationSettings {
  emailNotifications: boolean
  weeklyDigest: boolean
  riskAlerts: boolean
  slackIntegration?: SlackIntegration
}

export interface SlackIntegration {
  teamId: string
  teamName: string
  botToken: string
  defaultChannel?: string
}

// API Response types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

