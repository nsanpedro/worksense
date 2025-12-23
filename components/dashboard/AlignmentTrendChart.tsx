"use client"

import dynamic from "next/dynamic"

// Carga dinámica sin SSR para evitar hydration mismatch
const TrendChart = dynamic(
  () => import("./charts/TrendChart").then((mod) => mod.TrendChart),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[200px] flex items-center justify-center">
        <div className="animate-pulse bg-gray-200 rounded w-full h-full" />
      </div>
    )
  }
)

export function AlignmentTrendChart() {
  return <TrendChart />
}
