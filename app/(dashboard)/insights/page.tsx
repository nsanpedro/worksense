"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Lightbulb, 
  AlertTriangle, 
  Users, 
  Target,
  ArrowRight,
  XCircle,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

// Datos de ejemplo
const statsData = [
  { label: "Total Insights", value: "8", icon: Lightbulb, iconBg: "bg-blue-100", iconColor: "text-blue-600" },
  { label: "Critical Issues", value: "3", icon: AlertTriangle, iconBg: "bg-red-100", iconColor: "text-red-500" },
  { label: "Affected Teams", value: "4", icon: Users, iconBg: "bg-pink-100", iconColor: "text-pink-500" },
  { label: "Alignment Gap", value: "23%", icon: Target, iconBg: "bg-yellow-100", iconColor: "text-yellow-600" },
]

const processRecommendations = [
  {
    id: "1",
    title: "Bi-weekly Sprint Planning Workshops",
    priority: "high",
    description: "65% of developers report unclear sprint priorities, leading to misaligned work and rework cycles.",
    impactScore: 85,
    affectedPeople: 18,
    implementationEffort: "Medium",
    timeline: "2 weeks",
    roles: ["Dev", "PM", "Lead"],
    ifNotAdopted: [
      "Continued misalignment will cost ~15 dev hours/week in rework",
      "Developer satisfaction scores may drop 12-18 points"
    ],
    ifAdopted: [
      "Projected 30% reduction in sprint scope changes",
      "Estimated 12 hours/week saved across engineering"
    ]
  },
  {
    id: "2",
    title: "Async Communication Guidelines",
    priority: "high",
    description: "Teams report 3-5 hour daily meeting load, with 60% flagging 'too many sync meetings' as top friction point.",
    impactScore: 78,
    affectedPeople: 25,
    implementationEffort: "Low",
    timeline: "1 week",
    roles: ["Dev", "PM", "Design"],
    ifNotAdopted: [
      "Meeting fatigue will worsen, reducing productivity by 15-20%",
      "Deep work time remains scarce, affecting code quality"
    ],
    ifAdopted: [
      "Estimated 8-10 hours/week reclaimed per person",
      "Better work-life balance and reduced burnout"
    ]
  },
  {
    id: "3",
    title: "Stakeholder Expectation Documentation",
    priority: "medium",
    description: "PMs and stakeholders show 34-point alignment gap on delivery expectations and success metrics.",
    impactScore: 72,
    affectedPeople: 12,
    implementationEffort: "Medium",
    timeline: "2 weeks",
    roles: ["PM", "Lead", "Stakeholder"],
    ifNotAdopted: [
      "Expectation mismatches will continue causing friction",
      "Last-minute scope changes disrupt engineering flow"
    ],
    ifAdopted: [
      "Reduced scope thrash by ~40%",
      "Clearer priorities enable better resource allocation"
    ]
  },
]

const frictionPoints = [
  { id: "1", title: "Unclear sprint priorities", frequency: 65, roles: ["Dev", "PM"], severity: "high" },
  { id: "2", title: "Too many sync meetings", frequency: 60, roles: ["Dev", "PM", "Design"], severity: "high" },
  { id: "3", title: "Cross-team dependencies", frequency: 48, roles: ["Dev", "Lead"], severity: "medium" },
  { id: "4", title: "Stakeholder expectation gaps", frequency: 34, roles: ["PM", "Stakeholder"], severity: "medium" },
]

const alignmentTrends = [
  { label: "Developer-PM Alignment", value: 62, change: "Down 8 points from last month" },
  { label: "PM-Stakeholder Alignment", value: 54, change: "Down 12 points from last month" },
  { label: "Cross-Team Coordination", value: 48, change: "Stable from last month" },
]

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState("recommendations")

  const getPriorityBadge = (priority: string) => {
    if (priority === "high") {
      return <Badge className="bg-red-100 text-red-600 hover:bg-red-100 border-0">high priority</Badge>
    }
    return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-0">medium priority</Badge>
  }

  const getSeverityBadge = (severity: string) => {
    if (severity === "high") {
      return <Badge className="bg-red-500 text-white hover:bg-red-500 border-0">high</Badge>
    }
    return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-0">medium</Badge>
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Insights</h1>
        <p className="text-gray-500 mt-1">
          AI-powered analysis of team alignment, friction points, and process recommendations
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

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-gray-100 p-1">
          <TabsTrigger 
            value="recommendations" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Process Recommendations
          </TabsTrigger>
          <TabsTrigger 
            value="friction" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Friction Points
          </TabsTrigger>
          <TabsTrigger 
            value="trends" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Trends & Analysis
          </TabsTrigger>
        </TabsList>

        {/* Process Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          {processRecommendations.map((rec) => (
            <Card key={rec.id} className="border-gray-200">
              <CardContent className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">{rec.title}</h3>
                    {getPriorityBadge(rec.priority)}
                  </div>
                  <Button variant="outline" className="gap-2" asChild>
                    <Link href={`/insights/${rec.id}`}>
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>

                {/* Description */}
                <p className="text-gray-600">{rec.description}</p>

                {/* Metrics Row */}
                <div className="grid grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Impact Score</p>
                    <div className="flex items-center gap-2">
                      <Progress value={rec.impactScore} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{rec.impactScore}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Affected People</p>
                    <p className="font-medium text-gray-900">{rec.affectedPeople} members</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Implementation Effort</p>
                    <p className="font-medium text-gray-900">{rec.implementationEffort}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Timeline</p>
                    <p className="font-medium text-gray-900">{rec.timeline}</p>
                  </div>
                </div>

                {/* Roles */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Roles:</span>
                  {rec.roles.map((role) => (
                    <Badge key={role} variant="outline" className="bg-white font-normal">
                      {role}
                    </Badge>
                  ))}
                </div>

                {/* If NOT adopted / If adopted */}
                <div className="grid grid-cols-2 gap-6 pt-2">
                  <div>
                    <div className="flex items-center gap-2 text-red-600 mb-2">
                      <XCircle className="w-4 h-4" />
                      <span className="font-medium">If NOT adopted:</span>
                    </div>
                    <ul className="space-y-1">
                      {rec.ifNotAdopted.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-red-400 mt-1.5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-green-600 mb-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="font-medium">If adopted:</span>
                    </div>
                    <ul className="space-y-1">
                      {rec.ifAdopted.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-green-400 mt-1.5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Friction Points Tab */}
        <TabsContent value="friction" className="space-y-4">
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Friction Points</h3>
              <div className="space-y-4">
                {frictionPoints.map((point) => (
                  <div key={point.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className={`w-5 h-5 ${point.severity === "high" ? "text-red-500" : "text-yellow-500"}`} />
                        <span className="font-medium text-gray-900">{point.title}</span>
                      </div>
                      {getSeverityBadge(point.severity)}
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-sm text-gray-500">
                        Frequency: <span className="font-medium text-gray-900">{point.frequency}%</span>
                      </span>
                      <div className="flex items-center gap-1">
                        {point.roles.map((role) => (
                          <Badge key={role} variant="outline" className="bg-white font-normal text-xs">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Progress value={point.frequency} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends & Analysis Tab */}
        <TabsContent value="trends" className="space-y-4">
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Alignment Trends</h3>
              <div className="space-y-6">
                {alignmentTrends.map((trend) => (
                  <div key={trend.label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{trend.label}</span>
                      <span className="font-medium text-gray-900">{trend.value}%</span>
                    </div>
                    <Progress value={trend.value} className="h-2 mb-1" />
                    <p className="text-sm text-gray-500">{trend.change}</p>
                  </div>
                ))}
              </div>

              {/* Trend Alert */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Trend Alert</p>
                  <p className="text-sm text-gray-600">
                    Overall alignment has declined 7% this month. The top 3 process recommendations could recover 15-20 alignment points if implemented.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
