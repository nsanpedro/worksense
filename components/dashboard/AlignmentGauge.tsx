"use client"

import dynamic from "next/dynamic"

interface AlignmentGaugeProps {
  score: number
}

// Carga dinámica sin SSR para evitar hydration mismatch
const GaugeChart = dynamic(
  () => import("./charts/GaugeChart").then((mod) => mod.GaugeChart),
  { 
    ssr: false,
    loading: () => (
      <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
        <div className="animate-pulse bg-gray-200 rounded-full w-24 h-24" />
      </div>
    )
  }
)

export function AlignmentGauge({ score }: AlignmentGaugeProps) {
  return <GaugeChart score={score} />
}
