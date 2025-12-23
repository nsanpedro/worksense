"use client"

import { Cell, PieChart, Pie } from "recharts"

interface AlignmentGaugeProps {
  score: number
}

export function AlignmentGauge({ score }: AlignmentGaugeProps) {
  const data = [
    { value: score },
    { value: 100 - score }
  ]

  const getColor = (score: number) => {
    if (score >= 70) return "#10b981" // green
    if (score >= 50) return "#f59e0b" // amber
    return "#ef4444" // red
  }

  const color = getColor(score)

  return (
    <div className="relative w-32 h-32 mx-auto">
      <PieChart width={128} height={128}>
        <Pie
          data={data}
          cx={64}
          cy={64}
          startAngle={180}
          endAngle={0}
          innerRadius={45}
          outerRadius={60}
          dataKey="value"
          stroke="none"
        >
          <Cell fill={color} />
          <Cell fill="#f3f4f6" />
        </Pie>
      </PieChart>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl" style={{ color }}>
          {score}
        </div>
        <div className="text-sm text-gray-500">/ 100</div>
      </div>
    </div>
  )
}

