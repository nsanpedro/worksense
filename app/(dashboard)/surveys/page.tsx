import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Users, Calendar, Eye } from "lucide-react"

const surveys = [
  {
    id: "1",
    title: "October 2025 Team Alignment Survey",
    status: "Active",
    responses: 45,
    totalInvited: 60,
    deadline: "Oct 31, 2025",
    createdAt: "Oct 1, 2025",
  },
  {
    id: "2",
    title: "September 2025 Team Alignment Survey",
    status: "Completed",
    responses: 58,
    totalInvited: 60,
    deadline: "Sep 30, 2025",
    createdAt: "Sep 1, 2025",
  },
  {
    id: "3",
    title: "August 2025 Team Alignment Survey",
    status: "Completed",
    responses: 52,
    totalInvited: 55,
    deadline: "Aug 31, 2025",
    createdAt: "Aug 1, 2025",
  },
]

export default function SurveysPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 border-green-200"
      case "Completed":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "Draft":
        return "bg-gray-100 text-gray-700 border-gray-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Surveys</h1>
          <p className="text-gray-600">
            Create and manage team alignment surveys
          </p>
        </div>
        <Link href="/surveys/create">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Survey
          </Button>
        </Link>
      </div>

      {/* Survey List */}
      <div className="space-y-4">
        {surveys.map((survey) => (
          <Card key={survey.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900">{survey.title}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">Created {survey.createdAt}</p>
                  </div>
                </div>
                <Badge variant="outline" className={getStatusColor(survey.status)}>
                  {survey.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{survey.responses}/{survey.totalInvited} responses</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Deadline: {survey.deadline}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/surveys/${survey.id}`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="w-4 h-4" />
                      View Results
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

