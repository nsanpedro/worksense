"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft,
  ChevronRight,
  AlertTriangle,
  Target,
  TrendingUp,
  Zap,
  Clock,
  XCircle,
  CheckCircle2,
  Users,
  CirclePlus
} from "lucide-react"
import { toast } from "sonner"

// Datos de ejemplo - En producción vendrían de la API
const insightData = {
  id: "1",
  title: "Bi-weekly Sprint Planning Workshops",
  priority: "high",
  subtitle: "Detailed analysis and implementation guide",
  
  rootCause: {
    description: "65% of developers report unclear sprint priorities, leading to misaligned work and rework cycles.",
    surveyResponses: 23,
    agreementRate: 78,
    urgencyRating: 4.2,
  },
  
  implementation: {
    effortRequired: "Medium",
    timeline: "2 weeks",
    steps: [
      "Schedule recurring 90-min sessions every 2 weeks",
      "Include all dev leads, PMs, and key stakeholders",
      "Create pre-meeting async brief (shared 24h before)",
      "Use first 30 min for alignment, 60 min for planning"
    ]
  },
  
  impactAnalysis: {
    ifNotAdopted: [
      "Continued misalignment will cost ~15 dev hours/week in rework",
      "Developer satisfaction scores may drop 12-18 points",
      "Risk of missing Q4 delivery targets increases by 40%",
      "Cross-team dependencies will remain a major blocker"
    ],
    ifAdopted: [
      "Projected 30% reduction in sprint scope changes",
      "Estimated 12 hours/week saved across engineering",
      "Alignment score expected to increase 8-12 points",
      "Improved visibility for stakeholders"
    ],
    riskLevel: "High",
    riskDescription: "Inaction will compound existing friction and reduce team effectiveness",
    expectedROI: "High",
    roiDescription: "Benefits will compound over time, improving team effectiveness"
  },
  
  quickStats: {
    impactScore: 85,
    affectedPeople: 18,
    affectedRoles: ["Dev", "PM", "Lead"]
  },
  
  surveyInsights: [
    { quote: "Sprint planning is often unclear, leading to confusion mid-sprint.", author: "Senior Developer" },
    { quote: "We need better alignment between PM vision and eng execution.", author: "Engineering Lead" },
    { quote: "Too much time wasted on rework due to unclear requirements.", author: "Product Manager" }
  ],
  
  relatedIssues: [
    { title: "Unclear sprint priorities", percentage: 65 },
    { title: "Cross-team dependencies", percentage: 48 }
  ]
}

export default function InsightDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToActionPlan = async () => {
    setIsAdding(true)
    try {
      // TODO: Integrar con API
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Added to Action Plan!")
      router.push("/actions")
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/insights" className="hover:text-gray-700">Insights</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Process Detail</span>
        </nav>

        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="gap-2 mb-4 -ml-2 text-gray-600 hover:text-gray-900"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-semibold text-gray-900">{insightData.title}</h1>
              <Badge className="bg-red-100 text-red-600 hover:bg-red-100 border-0">
                {insightData.priority} priority
              </Badge>
            </div>
            <p className="text-gray-500">{insightData.subtitle}</p>
          </div>
          <Button 
            className="gap-2 bg-blue-600 hover:bg-blue-700"
            onClick={handleAddToActionPlan}
            disabled={isAdding}
          >
            <CirclePlus className="w-4 h-4" />
            Add to Action Plan
          </Button>
        </div>

        <div className="space-y-6 max-w-4xl">
          {/* Root Cause Analysis */}
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Root Cause Analysis</h2>
              </div>
              
              <p className="text-gray-600 mb-6">{insightData.rootCause.description}</p>
              
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Survey Responses</p>
                  <p className="text-2xl font-semibold text-gray-900">{insightData.rootCause.surveyResponses}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Agreement Rate</p>
                  <p className="text-2xl font-semibold text-gray-900">{insightData.rootCause.agreementRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Urgency Rating</p>
                  <p className="text-2xl font-semibold text-gray-900">{insightData.rootCause.urgencyRating}/5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How to Implement */}
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">How to Implement</h2>
              </div>

              {/* Effort & Timeline */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-3">
                  <Zap className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-500">Effort Required</p>
                    <p className="font-semibold text-gray-900">{insightData.implementation.effortRequired}</p>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-500">Timeline</p>
                    <p className="font-semibold text-gray-900">{insightData.implementation.timeline}</p>
                  </div>
                </div>
              </div>

              {/* Implementation Steps */}
              <h3 className="font-semibold text-gray-900 mb-4">Implementation Steps</h3>
              <div className="space-y-3">
                {insightData.implementation.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Impact Analysis */}
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Impact Analysis</h2>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* If NOT Adopted */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span className="font-semibold text-gray-900">If NOT Adopted</span>
                  </div>
                  <div className="space-y-3">
                    {insightData.impactAnalysis.ifNotAdopted.map((item, idx) => (
                      <div key={idx} className="bg-red-50 border border-red-100 rounded-lg p-3 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">{item}</p>
                      </div>
                    ))}
                    <div className="bg-red-100 rounded-lg p-4 mt-4">
                      <p className="font-semibold text-red-700">Risk Level: {insightData.impactAnalysis.riskLevel}</p>
                      <p className="text-sm text-red-600 mt-1">{insightData.impactAnalysis.riskDescription}</p>
                    </div>
                  </div>
                </div>

                {/* If Adopted */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-gray-900">If Adopted</span>
                  </div>
                  <div className="space-y-3">
                    {insightData.impactAnalysis.ifAdopted.map((item, idx) => (
                      <div key={idx} className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">{item}</p>
                      </div>
                    ))}
                    <div className="bg-green-100 rounded-lg p-4 mt-4">
                      <p className="font-semibold text-green-700">Expected ROI: {insightData.impactAnalysis.expectedROI}</p>
                      <p className="text-sm text-green-600 mt-1">{insightData.impactAnalysis.roiDescription}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 border-l border-gray-200 p-6 bg-white space-y-6 overflow-y-auto">
        {/* Quick Stats */}
        <Card className="border-gray-200">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-gray-900">Quick Stats</h3>
            
            {/* Impact Score */}
            <div>
              <p className="text-sm text-gray-500 mb-2">Impact Score</p>
              <Progress value={insightData.quickStats.impactScore} className="h-2 mb-1" />
              <p className="text-2xl font-semibold text-gray-900">{insightData.quickStats.impactScore}%</p>
            </div>

            {/* Affected People */}
            <div>
              <p className="text-sm text-gray-500">Affected People</p>
              <div className="flex items-center gap-2 mt-1">
                <Users className="w-5 h-5 text-gray-400" />
                <span className="text-xl font-semibold text-gray-900">{insightData.quickStats.affectedPeople}</span>
              </div>
              <p className="text-sm text-gray-500">team members</p>
            </div>

            {/* Affected Roles */}
            <div>
              <p className="text-sm text-gray-500 mb-2">Affected Roles</p>
              <div className="flex gap-1 flex-wrap">
                {insightData.quickStats.affectedRoles.map((role) => (
                  <Badge key={role} variant="outline" className="bg-white font-normal">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Survey Insights */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Survey Insights</h3>
            <div className="space-y-4">
              {insightData.surveyInsights.map((insight, idx) => (
                <div key={idx}>
                  <p className="text-sm text-gray-700 italic">"{insight.quote}"</p>
                  <p className="text-xs text-gray-500 mt-1">— {insight.author}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Related Issues */}
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Related Issues</h3>
            <div className="space-y-4">
              {insightData.relatedIssues.map((issue, idx) => (
                <div key={idx}>
                  <p className="font-medium text-gray-900 mb-1">{issue.title}</p>
                  <Progress value={issue.percentage} className="h-1.5 mb-1" />
                  <p className="text-xs text-gray-500">Reported by {issue.percentage}% of team</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

