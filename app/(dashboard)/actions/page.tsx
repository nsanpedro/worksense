import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckSquare, Plus, Users, Calendar, ArrowRight } from "lucide-react"

const actions = [
  {
    id: 1,
    title: "Introduce Dynamic Quarterly Roadmap",
    description: "Establish a living roadmap document with monthly reviews and transparent change logs.",
    owner: "PM",
    ownerColor: "bg-blue-500",
    dueDate: "Nov 15, 2025",
    status: "Pending",
    progress: 0,
    priority: "High",
  },
  {
    id: 2,
    title: "Weekly Cross-Team Sync Protocol",
    description: "30-minute weekly sync focused on blockers and alignment on shared deliverables.",
    owner: "EM",
    ownerColor: "bg-green-500",
    dueDate: "Nov 1, 2025",
    status: "In Progress",
    progress: 35,
    priority: "Medium",
  },
  {
    id: 3,
    title: "Scope Freeze Policy Implementation",
    description: "Implement a hard freeze on new scope 48 hours before sprint start.",
    owner: "Stakeholder",
    ownerColor: "bg-purple-500",
    dueDate: "Nov 8, 2025",
    status: "Pending",
    progress: 0,
    priority: "High",
  },
  {
    id: 4,
    title: "Team Wellness Check-in",
    description: "Schedule 1-on-1s with team members showing burnout indicators.",
    owner: "EM",
    ownerColor: "bg-green-500",
    dueDate: "Oct 28, 2025",
    status: "In Progress",
    progress: 60,
    priority: "Urgent",
  },
]

export default function ActionsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-700 border-green-200"
      case "In Progress":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 text-red-700 border-red-200"
      case "High":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <CheckSquare className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h1 className="text-gray-900 mb-1">Actions</h1>
            <p className="text-gray-600">
              Track and manage recommended actions from insights
            </p>
          </div>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Action
        </Button>
      </div>

      {/* Actions List */}
      <div className="space-y-4">
        {actions.map((action) => (
          <Card key={action.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-gray-900">{action.title}</CardTitle>
                  <p className="text-gray-600 mt-1">{action.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getPriorityColor(action.priority)}>
                    {action.priority}
                  </Badge>
                  <Badge variant="outline" className={getStatusColor(action.status)}>
                    {action.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Badge className={action.ownerColor}>
                      {action.owner}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {action.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2 w-32">
                    <Progress value={action.progress} className="h-2" />
                    <span className="text-sm text-gray-600">{action.progress}%</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="gap-2">
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

