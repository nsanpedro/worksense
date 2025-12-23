import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, TrendingDown, AlertTriangle, Target } from "lucide-react"

const insights = [
  {
    id: 1,
    category: "Alignment",
    title: "Team alignment improved this month",
    description: "Overall alignment score increased by 5 points compared to last month, driven by clearer sprint goals.",
    trend: "up",
    impact: "Positive",
    icon: TrendingUp,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: 2,
    category: "Risk",
    title: "Burnout indicators rising",
    description: "Multiple team members reported increased stress levels. Consider reviewing workload distribution.",
    trend: "down",
    impact: "High Risk",
    icon: AlertTriangle,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    id: 3,
    category: "Communication",
    title: "Cross-team communication improving",
    description: "Weekly syncs are helping reduce dependency delays. Teams report better visibility into each other's work.",
    trend: "up",
    impact: "Positive",
    icon: Target,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 4,
    category: "Process",
    title: "Scope creep remains a concern",
    description: "40% of respondents mentioned last-minute scope changes as their biggest friction point.",
    trend: "down",
    impact: "Needs Attention",
    icon: TrendingDown,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
]

export default function InsightsPage() {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Positive":
        return "bg-green-100 text-green-700 border-green-200"
      case "High Risk":
        return "bg-red-100 text-red-700 border-red-200"
      case "Needs Attention":
        return "bg-orange-100 text-orange-700 border-orange-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h1 className="text-gray-900 mb-1">Insights</h1>
          <p className="text-gray-600">
            AI-generated insights from your team surveys
          </p>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-2 gap-6">
        {insights.map((insight) => (
          <Card key={insight.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg ${insight.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <insight.icon className={`w-5 h-5 ${insight.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{insight.category}</p>
                    <CardTitle className="text-gray-900">{insight.title}</CardTitle>
                  </div>
                </div>
                <Badge variant="outline" className={getImpactColor(insight.impact)}>
                  {insight.impact}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

