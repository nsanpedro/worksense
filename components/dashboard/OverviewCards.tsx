"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, AlertTriangle } from "lucide-react"
import { AlignmentGauge } from "./AlignmentGauge"
import { Badge } from "@/components/ui/badge"

export function OverviewCards() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Alignment Score */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">Alignment Score</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <AlignmentGauge score={58} />
          <div className="text-center">
            <p className="text-sm text-gray-500">Current alignment level</p>
          </div>
        </CardContent>
      </Card>

      {/* Trend vs Last Month */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">Monthly Trend</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center gap-3 pt-6">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-3xl text-green-600">+5</div>
              <div className="text-sm text-gray-500">vs last month</div>
            </div>
          </div>
          <p className="text-sm text-center text-gray-600">
            Positive momentum in alignment
          </p>
        </CardContent>
      </Card>

      {/* Risk Indicator */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">Risk Indicator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-3 pt-6">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-center">
              <div className="text-gray-900 mb-2">Burnout Risk</div>
              <Badge variant="destructive" className="bg-red-500">High</Badge>
            </div>
          </div>
          <p className="text-sm text-center text-gray-600">
            Team showing signs of fatigue
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

