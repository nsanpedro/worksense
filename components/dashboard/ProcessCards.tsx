import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, Users, Clock } from "lucide-react"

const processes = [
  {
    id: 1,
    icon: Target,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "Introduce Dynamic Quarterly Roadmap",
    why: "Teams need visibility into shifting priorities and a shared source of truth for what's being built and why.",
    how: "Establish a living roadmap document with monthly reviews. Include stakeholder input windows and transparent change logs.",
    owner: "PM",
    ownerColor: "bg-blue-500",
    status: "Pending",
    adoption: 0,
  },
  {
    id: 2,
    icon: Users,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    title: "Weekly Cross-Team Sync Protocol",
    why: "Reduce dependency delays and improve communication between engineering, design, and product teams.",
    how: "30-minute weekly sync focused on blockers, upcoming dependencies, and alignment on shared deliverables.",
    owner: "EM",
    ownerColor: "bg-green-500",
    status: "In Progress",
    adoption: 35,
  },
  {
    id: 3,
    icon: Clock,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    title: "Scope Freeze 48hrs Before Sprint",
    why: "Prevent last-minute scope changes that derail sprint planning and create team stress.",
    how: "Implement a hard freeze on new scope 48 hours before sprint start. Emergency changes require explicit exec approval.",
    owner: "Stakeholder",
    ownerColor: "bg-purple-500",
    status: "Pending",
    adoption: 0,
  },
]

export function ProcessCards() {
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

  return (
    <div className="space-y-4">
      {processes.map((process) => (
        <Card key={process.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg ${process.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <process.icon className={`w-5 h-5 ${process.iconColor}`} />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-gray-900">{process.title}</CardTitle>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={process.ownerColor}>
                  {process.owner}
                </Badge>
                <Badge variant="outline" className={getStatusColor(process.status)}>
                  {process.status}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Why</div>
                <p className="text-gray-700">{process.why}</p>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">How</div>
                <p className="text-gray-700">{process.how}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Action adoption</span>
                <span className="text-gray-700">{process.adoption}%</span>
              </div>
              <Progress value={process.adoption} className="h-2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

