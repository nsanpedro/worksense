import { TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OverviewCards } from "@/components/dashboard/OverviewCards"
import { InsightsSection } from "@/components/dashboard/InsightsSection"
import { ProcessCards } from "@/components/dashboard/ProcessCards"
import { AlignmentTrendChart } from "@/components/dashboard/AlignmentTrendChart"
import { RightSidebar } from "@/components/layout/RightSidebar"

export default function DashboardPage() {
  return (
    <div className="flex">
      {/* Main Dashboard Content */}
      <div className="flex-1 p-8 space-y-8">
        {/* Page Title */}
        <div>
          <h1 className="text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-600">
            Monthly AI survey results analyzing team alignment and organizational insights
          </p>
        </div>

        {/* Overview Cards */}
        <section>
          <h2 className="text-gray-900 mb-4">Overview</h2>
          <OverviewCards />
        </section>

        {/* Alignment Trend Chart */}
        <section>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
                <CardTitle className="text-gray-900">6-Month Alignment Trend</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <AlignmentTrendChart />
            </CardContent>
          </Card>
        </section>

        {/* Key Insights */}
        <section>
          <h2 className="text-gray-900 mb-4">Key Insights</h2>
          <InsightsSection />
        </section>

        {/* Suggested Processes */}
        <section>
          <h2 className="text-gray-900 mb-4">Suggested Processes</h2>
          <ProcessCards />
        </section>
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  )
}

