import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Search, FileText } from "lucide-react"

export function InsightsSection() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Top Frictions */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-orange-600" />
            </div>
            <CardTitle className="text-gray-900">Top Frictions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2"></div>
              <span className="text-gray-700">Scope creep in sprint planning</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2"></div>
              <span className="text-gray-700">Unclear quarterly priorities</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2"></div>
              <span className="text-gray-700">Reactive communication patterns</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2"></div>
              <span className="text-gray-700">Cross-team dependency delays</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Root Causes */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <Search className="w-4 h-4 text-blue-600" />
            </div>
            <CardTitle className="text-gray-900">Root Causes</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-gray-700">
            Teams lack a shared framework for prioritization, leading to misaligned expectations.
          </p>
          <p className="text-gray-700">
            Communication defaults to ad-hoc channels rather than structured check-ins.
          </p>
          <p className="text-gray-700">
            Roadmap adjustments aren&apos;t transparently communicated to all stakeholders.
          </p>
        </CardContent>
      </Card>

      {/* Narrative Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <FileText className="w-4 h-4 text-purple-600" />
            </div>
            <CardTitle className="text-gray-900">Narrative Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            This month showed positive momentum with a +5 increase in alignment. However, teams are experiencing burnout due to reactive workstreams. The core issue stems from unclear prioritization frameworks and insufficient structured communication. Implementing quarterly roadmap reviews and weekly sync protocols could significantly reduce friction.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

