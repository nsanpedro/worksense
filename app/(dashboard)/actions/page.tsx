"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Filter,
  User,
  Calendar,
  Users,
  TrendingUp,
  ChevronRight,
  CircleCheck,
  X,
  Edit,
  MessageSquare
} from "lucide-react"

// Datos de ejemplo enriquecidos
const statsData = [
  { label: "Total Actions", value: "8", icon: CircleCheck, iconBg: "bg-blue-100", iconColor: "text-blue-600" },
  { label: "Completed", value: "1", icon: CheckCircle2, iconBg: "bg-green-100", iconColor: "text-green-600" },
  { label: "In Progress", value: "3", icon: Clock, iconBg: "bg-blue-100", iconColor: "text-blue-600" },
  { label: "Blocked", value: "1", icon: AlertCircle, iconBg: "bg-red-100", iconColor: "text-red-500" },
]

interface ActionItem {
  id: string
  title: string
  description: string
  status: "Not Started" | "In Progress" | "Completed" | "Blocked"
  priority: "high" | "medium" | "low"
  owner: string
  ownerRole: string
  dueDate: string
  collaborators: string[]
  progress: number
  blocked: boolean
  blockedReason: string | null
  relatedTo: string
  expectedImpact: string
  implementationSteps: { id: string; text: string; completed: boolean }[]
  notes: string
}

const actionsData: ActionItem[] = [
  {
    id: "1",
    title: "Schedule Bi-weekly Sprint Planning Workshops",
    description: "Set up recurring 90-minute sprint planning sessions with all dev leads, PMs, and key stakeholders to improve sprint clarity and alignment.",
    status: "In Progress",
    priority: "high",
    owner: "Sarah Chen",
    ownerRole: "Engineering Manager",
    dueDate: "Nov 5, 2025",
    collaborators: ["Alex Kim", "Jordan Lee", "Casey Morgan"],
    progress: 50,
    blocked: false,
    blockedReason: null,
    relatedTo: "Bi-weekly Sprint Planning Workshops",
    expectedImpact: "Projected 30% reduction in sprint scope changes and estimated 12 hours/week saved across engineering",
    implementationSteps: [
      { id: "s1", text: "Define workshop agenda and format", completed: true },
      { id: "s2", text: "Schedule recurring calendar invites", completed: true },
      { id: "s3", text: "Create workshop facilitation guide", completed: false },
      { id: "s4", text: "Run first session and gather feedback", completed: false },
    ],
    notes: ""
  },
  {
    id: "2",
    title: "Implement No-Meeting Focus Blocks",
    description: "Establish protected no-meeting time blocks twice a week to improve deep work and developer productivity.",
    status: "Completed",
    priority: "high",
    owner: "Sarah Chen",
    ownerRole: "Engineering Manager",
    dueDate: "Oct 20, 2025",
    collaborators: ["All Team Leads"],
    progress: 100,
    blocked: false,
    blockedReason: null,
    relatedTo: "Bi-weekly Sprint Planning Workshops",
    expectedImpact: "Increases focused work time by 8 hours per developer per week",
    implementationSteps: [
      { id: "s1", text: "Survey team for preferred focus time", completed: true },
      { id: "s2", text: "Block calendars for Tuesday/Thursday afternoons", completed: true },
      { id: "s3", text: "Communicate policy to stakeholders", completed: true },
      { id: "s4", text: "Monitor compliance and adjust", completed: true },
    ],
    notes: "Successfully implemented. Team reports 40% improvement in task completion."
  },
  {
    id: "3",
    title: "Create Async Communication Guidelines Document",
    description: "Define when to use sync vs async communication and establish response time SLAs to reduce meeting fatigue.",
    status: "Not Started",
    priority: "high",
    owner: "Mike Ross",
    ownerRole: "Product Manager",
    dueDate: "Nov 8, 2025",
    collaborators: ["Design Team", "Engineering Leads"],
    progress: 0,
    blocked: false,
    blockedReason: null,
    relatedTo: "Async Communication Guidelines",
    expectedImpact: "Expected 25% reduction in unnecessary meetings and faster decision-making",
    implementationSteps: [
      { id: "s1", text: "Audit current communication patterns", completed: false },
      { id: "s2", text: "Draft guidelines document", completed: false },
      { id: "s3", text: "Get feedback from team leads", completed: false },
      { id: "s4", text: "Publish and train teams", completed: false },
    ],
    notes: ""
  },
  {
    id: "4",
    title: "Launch Weekly PM-Dev Sync",
    description: "Establish weekly 30-min check-ins between PMs and dev leads to surface blockers early and maintain alignment.",
    status: "In Progress",
    priority: "medium",
    owner: "Mike Ross",
    ownerRole: "Product Manager",
    dueDate: "Nov 3, 2025",
    collaborators: ["Engineering Leads"],
    progress: 60,
    blocked: false,
    blockedReason: null,
    relatedTo: "Stakeholder Expectation Documentation",
    expectedImpact: "Reduces misalignment issues by 40% and surfaces blockers 2-3 days earlier",
    implementationSteps: [
      { id: "s1", text: "Define meeting agenda template", completed: true },
      { id: "s2", text: "Schedule recurring meetings", completed: true },
      { id: "s3", text: "Create shared notes document", completed: true },
      { id: "s4", text: "Run 4 sessions and iterate", completed: false },
    ],
    notes: "First two sessions completed. Team finding it valuable."
  },
  {
    id: "5",
    title: "Establish Stakeholder Expectation Framework",
    description: "Create a framework for setting and managing stakeholder expectations around delivery timelines and scope.",
    status: "Not Started",
    priority: "medium",
    owner: "David Park",
    ownerRole: "Stakeholder",
    dueDate: "Nov 12, 2025",
    collaborators: ["Product Team", "Engineering Leadership"],
    progress: 0,
    blocked: false,
    blockedReason: null,
    relatedTo: "Stakeholder Expectation Documentation",
    expectedImpact: "Improves stakeholder satisfaction scores and reduces last-minute scope changes",
    implementationSteps: [
      { id: "s1", text: "Interview key stakeholders", completed: false },
      { id: "s2", text: "Document common expectation gaps", completed: false },
      { id: "s3", text: "Create communication templates", completed: false },
      { id: "s4", text: "Pilot with one product area", completed: false },
    ],
    notes: ""
  },
  {
    id: "6",
    title: "Quarterly OKR Alignment Sessions",
    description: "Facilitate quarterly sessions to ensure all teams understand how their work ladders up to company objectives.",
    status: "Blocked",
    priority: "medium",
    owner: "David Park",
    ownerRole: "Stakeholder",
    dueDate: "Nov 15, 2025",
    collaborators: ["All Team Leads", "Mike Ross"],
    progress: 25,
    blocked: true,
    blockedReason: "Waiting for executive team to finalize Q4 OKRs",
    relatedTo: "Stakeholder Expectation Documentation",
    expectedImpact: "Improves strategic alignment and reduces misaligned effort",
    implementationSteps: [
      { id: "s1", text: "Finalize Q4 company OKRs", completed: false },
      { id: "s2", text: "Schedule quarterly session", completed: false },
      { id: "s3", text: "Create alignment workshop agenda", completed: false },
      { id: "s4", text: "Run session and document outcomes", completed: false },
    ],
    notes: ""
  },
  {
    id: "7",
    title: "Define Cross-Team Dependency Protocol",
    description: "Establish clear protocols for managing dependencies between teams to reduce delays and improve predictability.",
    status: "Not Started",
    priority: "medium",
    owner: "Jessica Liu",
    ownerRole: "Engineering Lead",
    dueDate: "Nov 10, 2025",
    collaborators: ["All Team Leads"],
    progress: 0,
    blocked: false,
    blockedReason: null,
    relatedTo: "Bi-weekly Sprint Planning Workshops",
    expectedImpact: "Reduces cross-team dependency delays by 50% and improves sprint predictability",
    implementationSteps: [
      { id: "s1", text: "Map current dependencies", completed: false },
      { id: "s2", text: "Define handoff protocol", completed: false },
      { id: "s3", text: "Create dependency tracking system", completed: false },
      { id: "s4", text: "Train teams on new protocol", completed: false },
    ],
    notes: ""
  },
  {
    id: "8",
    title: "Document Sprint Retrospective Action Items",
    description: "Create a system to track and follow up on retrospective action items to ensure they're actually implemented.",
    status: "Not Started",
    priority: "low",
    owner: "Tom Zhang",
    ownerRole: "Developer",
    dueDate: "Nov 18, 2025",
    collaborators: ["Scrum Masters"],
    progress: 0,
    blocked: false,
    blockedReason: null,
    relatedTo: "Bi-weekly Sprint Planning Workshops",
    expectedImpact: "Increases retrospective action completion rate from 30% to 80%",
    implementationSteps: [
      { id: "s1", text: "Audit past retro action items", completed: false },
      { id: "s2", text: "Design tracking template", completed: false },
      { id: "s3", text: "Integrate with sprint planning", completed: false },
      { id: "s4", text: "Review and iterate monthly", completed: false },
    ],
    notes: ""
  },
]

export default function ActionsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedAction, setSelectedAction] = useState<ActionItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleActionClick = (action: ActionItem) => {
    setSelectedAction(action)
    setIsModalOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0">{status}</Badge>
      case "Completed":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">{status}</Badge>
      case "Not Started":
        return <Badge variant="outline" className="text-gray-600">{status}</Badge>
      case "Blocked":
        return <Badge className="bg-red-100 text-red-600 hover:bg-red-100 border-0">{status}</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-600 hover:bg-red-100 border-0">{priority}</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-0">{priority}</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">{priority}</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Progress":
        return <Clock className="w-5 h-5 text-blue-500" />
      case "Completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case "Not Started":
        return <Clock className="w-5 h-5 text-gray-400" />
      case "Blocked":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  // Filtrar acciones
  const filteredActions = actionsData.filter(action => {
    if (statusFilter !== "all" && action.status !== statusFilter) return false
    if (roleFilter !== "all") {
      const roleMap: Record<string, string> = {
        pm: "Product Manager",
        em: "Engineering Manager",
        dev: "Developer",
        stakeholder: "Stakeholder",
        lead: "Engineering Lead"
      }
      if (action.ownerRole !== roleMap[roleFilter]) return false
    }
    return true
  })

  // Agrupar acciones por rol para la vista "By Role"
  const actionsByRole = actionsData.reduce((acc, action) => {
    const role = action.ownerRole
    if (!acc[role]) {
      acc[role] = []
    }
    acc[role].push(action)
    return acc
  }, {} as Record<string, ActionItem[]>)

  // Orden de roles para mostrar
  const roleOrder = ["Engineering Manager", "Product Manager", "Stakeholder", "Engineering Lead", "Developer"]

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Actions</h1>
        <p className="text-gray-500 mt-1">
          Track and manage action items across all roles with clear ownership and accountability
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <Card key={stat.label} className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Filter className="w-4 h-4" />
          <span className="text-sm">Filter by:</span>
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-40 bg-gray-50">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="pm">Product Manager</SelectItem>
            <SelectItem value="em">Engineering Manager</SelectItem>
            <SelectItem value="lead">Engineering Lead</SelectItem>
            <SelectItem value="dev">Developer</SelectItem>
            <SelectItem value="stakeholder">Stakeholder</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 bg-gray-50">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Not Started">Not Started</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Blocked">Blocked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-100 p-1">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            All Actions
          </TabsTrigger>
          <TabsTrigger 
            value="my" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            My Actions
          </TabsTrigger>
          <TabsTrigger 
            value="role" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            By Role
          </TabsTrigger>
        </TabsList>

        {/* All Actions Tab */}
        <TabsContent value="all" className="space-y-4 mt-4">
          {filteredActions.map((action) => (
            <Card 
              key={action.id} 
              className="border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleActionClick(action)}
            >
              <CardContent className="p-6">
                {/* Header Row */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-3">
                    {getStatusIcon(action.status)}
                    <div>
                      <h3 className="font-semibold text-gray-900">{action.title}</h3>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 ml-8">{action.description}</p>

                {/* Badges & Meta */}
                <div className="flex items-center gap-4 mb-4 ml-8 flex-wrap">
                  {getStatusBadge(action.status)}
                  {getPriorityBadge(action.priority)}
                  
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{action.owner}</span>
                    <span className="text-gray-400">({action.ownerRole})</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Due {action.dueDate}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{action.collaborators.length} collaborators</span>
                  </div>
                </div>

                {/* Progress */}
                {action.progress > 0 && (
                  <div className="ml-8 mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-500">Progress</span>
                      <span className="text-sm font-medium text-gray-900">{action.progress}%</span>
                    </div>
                    <Progress value={action.progress} className="h-2" />
                  </div>
                )}

                {/* Blocked Reason */}
                {action.blocked && action.blockedReason && (
                  <div className="ml-8 mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-600 text-sm">Current Blocker</p>
                        <p className="text-sm text-red-600">{action.blockedReason}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Related To */}
                <div className="ml-8 flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-500">Related to:</span>
                  <Link 
                    href="/insights/1" 
                    className="text-gray-900 hover:underline font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {action.relatedTo}
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* My Actions Tab */}
        <TabsContent value="my" className="mt-4">
          <Card className="border-gray-200">
            <CardContent className="p-8 text-center text-gray-500">
              <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Login to see your assigned actions</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* By Role Tab */}
        <TabsContent value="role" className="space-y-6 mt-4">
          {roleOrder.map((role) => {
            const roleActions = actionsByRole[role]
            if (!roleActions || roleActions.length === 0) return null

            return (
              <div key={role} className="space-y-3">
                {/* Role Header */}
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-500" />
                  <h3 className="font-semibold text-gray-900">{role}</h3>
                  <Badge variant="outline" className="text-gray-500">
                    {roleActions.length} actions
                  </Badge>
                </div>

                {/* Actions for this role */}
                <div className="space-y-2 ml-8">
                  {roleActions.map((action) => (
                    <Card 
                      key={action.id} 
                      className="border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleActionClick(action)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(action.status)}
                            <div>
                              <h4 className="font-medium text-gray-900">{action.title}</h4>
                              <p className="text-sm text-gray-500">
                                {action.owner} · Due {action.dueDate}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {getPriorityBadge(action.priority)}
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </TabsContent>
      </Tabs>

      {/* Action Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedAction && (
            <>
              <DialogHeader className="space-y-3">
                <DialogTitle className="text-xl font-semibold text-gray-900 pr-8">
                  {selectedAction.title}
                </DialogTitle>
                <p className="text-gray-600 text-sm">
                  {selectedAction.description}
                </p>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                {/* Status & Priority Row */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Status:</span>
                    <Select defaultValue={selectedAction.status}>
                      <SelectTrigger className="w-32 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Not Started">Not Started</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Blocked">Blocked</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {getPriorityBadge(selectedAction.priority)}
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Owner</p>
                      <p className="font-medium text-gray-900">{selectedAction.owner}</p>
                      <p className="text-sm text-gray-500">{selectedAction.ownerRole}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Due Date</p>
                      <p className="font-medium text-gray-900">{selectedAction.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Collaborators</p>
                      <p className="font-medium text-gray-900">{selectedAction.collaborators.join(", ")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Related Insight</p>
                      <Link href="/insights/1" className="font-medium text-gray-900 hover:underline">
                        {selectedAction.relatedTo}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Expected Impact */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Expected Impact</p>
                      <p className="text-sm text-gray-700 mt-1">{selectedAction.expectedImpact}</p>
                    </div>
                  </div>
                </div>

                {/* Current Blocker */}
                {selectedAction.blocked && selectedAction.blockedReason && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-600">Current Blocker</p>
                        <p className="text-sm text-red-600 mt-1">{selectedAction.blockedReason}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">Progress</span>
                    <span className="text-sm font-medium text-gray-900">{selectedAction.progress}%</span>
                  </div>
                  <Progress value={selectedAction.progress} className="h-3" />
                </div>

                {/* Implementation Steps */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Implementation Steps</h4>
                  <div className="space-y-3">
                    {selectedAction.implementationSteps.map((step) => (
                      <div 
                        key={step.id} 
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <Checkbox 
                          checked={step.completed} 
                          className="data-[state=checked]:bg-gray-900"
                        />
                        <span className={`text-sm ${step.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                          {step.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes & Updates */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-500" />
                      <h4 className="font-semibold text-gray-900">Notes & Updates</h4>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-600 gap-1">
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 min-h-[80px]">
                    {selectedAction.notes ? (
                      <p className="text-sm text-gray-700">{selectedAction.notes}</p>
                    ) : (
                      <p className="text-sm text-gray-400 italic">No notes yet. Click Edit to add notes or updates.</p>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                    Close
                  </Button>
                  <Button className="gap-2 bg-gray-900 hover:bg-gray-800">
                    <CheckCircle2 className="w-4 h-4" />
                    Mark as Complete
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
