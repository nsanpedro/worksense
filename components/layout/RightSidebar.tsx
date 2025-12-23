"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle2, ExternalLink } from "lucide-react"

const upcomingActions = [
  {
    id: 1,
    title: "Monthly Retro",
    date: "Nov 1st",
    owners: ["EM", "PM"],
    ownerColors: ["bg-green-500", "bg-blue-500"],
  },
  {
    id: 2,
    title: "Kick-off Prioritization Workshop",
    date: "Nov 3rd",
    owners: ["Stakeholders"],
    ownerColors: ["bg-purple-500"],
  },
]

export function RightSidebar() {
  return (
    <div className="w-80 h-screen bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Upcoming Actions */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-gray-700" />
            <h2 className="text-gray-900">Upcoming Actions</h2>
          </div>
          <div className="space-y-3">
            {upcomingActions.map((action) => (
              <Card key={action.id} className="bg-white">
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="text-gray-900 mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-500">{action.date}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {action.owners.map((owner, idx) => (
                        <Badge
                          key={idx}
                          className={`${action.ownerColors[idx]} text-xs`}
                        >
                          {owner}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Mark as Reviewed
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Preview Survey Button */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div>
                <h3 className="text-gray-900 mb-1">Preview Survey Experience</h3>
                <p className="text-sm text-gray-600">
                  See what your team members will experience
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2"
                asChild
              >
                <Link href="/survey/preview">
                  <ExternalLink className="w-4 h-4" />
                  View Public Survey
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alignment Trend */}
        <div>
          <h2 className="text-gray-900 mb-4">6-Month Alignment Trend</h2>
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="space-y-2">
                {[
                  { month: "May", score: 51, change: 0 },
                  { month: "Jun", score: 48, change: -3 },
                  { month: "Jul", score: 52, change: 4 },
                  { month: "Aug", score: 49, change: -3 },
                  { month: "Sep", score: 53, change: 4 },
                  { month: "Oct", score: 58, change: 5 },
                ].map((item) => (
                  <div
                    key={item.month}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-sm text-gray-600">{item.month}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900">{item.score}</span>
                      {item.change !== 0 && (
                        <span
                          className={`text-xs ${
                            item.change > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {item.change > 0 ? `+${item.change}` : item.change}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

