"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Datos de ejemplo
const surveysData = [
  {
    id: "1",
    name: "Q4 Team Focus",
    targetRoles: ["Dev", "PM", "Lead"],
    status: "Active",
    responses: 12,
    totalResponses: 15,
    lastRun: "Oct 15, 2025",
  },
  {
    id: "2",
    name: "Sprint Clarity Pulse",
    targetRoles: ["Dev", "PM"],
    status: "Active",
    responses: 8,
    totalResponses: 10,
    lastRun: "Oct 10, 2025",
  },
  {
    id: "3",
    name: "Leadership Alignment Check",
    targetRoles: ["Lead", "Stakeholder"],
    status: "Closed",
    responses: 6,
    totalResponses: 6,
    lastRun: "Sep 20, 2025",
  },
  {
    id: "4",
    name: "Cross-Team Dependency Survey",
    targetRoles: ["Dev", "PM", "Lead", "Stakeholder"],
    status: "Draft",
    responses: 0,
    totalResponses: 20,
    lastRun: null,
  },
  {
    id: "5",
    name: "Burnout & Workload Assessment",
    targetRoles: ["Dev", "PM"],
    status: "Closed",
    responses: 14,
    totalResponses: 14,
    lastRun: "Sep 15, 2025",
  },
]

const statusOptions = ["All", "Draft", "Active", "Closed"]
const teamOptions = ["All Teams", "Engineering", "Product", "Design", "Leadership"]
const dateRangeOptions = ["Last 30 days", "Last 3 months", "Last 6 months", "All time"]

export default function SurveysPage() {
  const [selectedStatus, setSelectedStatus] = useState<string[]>(["All"])
  const [selectedTeams, setSelectedTeams] = useState<string[]>(["All Teams"])
  const [selectedDateRange, setSelectedDateRange] = useState("Last 3 months")
  const [currentPage, setCurrentPage] = useState(1)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">{status}</Badge>
      case "Closed":
        return <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100 border-0">{status}</Badge>
      case "Draft":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0">{status}</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    return (
      <Badge 
        key={role} 
        variant="outline" 
        className="bg-white text-gray-600 border-gray-200 font-normal"
      >
        {role}
      </Badge>
    )
  }

  const handleStatusChange = (status: string, checked: boolean) => {
    if (status === "All") {
      setSelectedStatus(checked ? ["All"] : [])
    } else {
      const newStatus = checked
        ? [...selectedStatus.filter(s => s !== "All"), status]
        : selectedStatus.filter(s => s !== status)
      setSelectedStatus(newStatus.length === 0 ? ["All"] : newStatus)
    }
  }

  const handleTeamChange = (team: string, checked: boolean) => {
    if (team === "All Teams") {
      setSelectedTeams(checked ? ["All Teams"] : [])
    } else {
      const newTeams = checked
        ? [...selectedTeams.filter(t => t !== "All Teams"), team]
        : selectedTeams.filter(t => t !== team)
      setSelectedTeams(newTeams.length === 0 ? ["All Teams"] : newTeams)
    }
  }

  // Filtrar surveys
  const filteredSurveys = surveysData.filter(survey => {
    if (!selectedStatus.includes("All") && !selectedStatus.includes(survey.status)) {
      return false
    }
    return true
  })

  return (
    <div className="flex h-full">
      {/* Filters Sidebar */}
      <div className="w-64 border-r border-gray-200 p-6 space-y-6 bg-white">
        <h2 className="font-semibold text-gray-900">Filters</h2>

        {/* Status Filter */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Status</h3>
          <div className="space-y-2">
            {statusOptions.map((status) => (
              <label key={status} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={selectedStatus.includes(status)}
                  onCheckedChange={(checked) => handleStatusChange(status, checked as boolean)}
                />
                <span className="text-sm text-gray-600">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Team Filter */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Team</h3>
          <div className="space-y-2">
            {teamOptions.map((team) => (
              <label key={team} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={selectedTeams.includes(team)}
                  onCheckedChange={(checked) => handleTeamChange(team, checked as boolean)}
                />
                <span className="text-sm text-gray-600">{team}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Date Range</h3>
          <div className="space-y-2">
            {dateRangeOptions.map((range) => (
              <label key={range} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={selectedDateRange === range}
                  onCheckedChange={(checked) => {
                    if (checked) setSelectedDateRange(range)
                  }}
                />
                <span className="text-sm text-gray-600">{range}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Surveys</h1>
            <p className="text-gray-500 mt-1">
              Manage and track AI-curated alignment surveys
            </p>
          </div>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="/surveys/create">
              <Plus className="w-4 h-4" />
              Create Survey
            </Link>
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="text-gray-600 font-medium">Survey Name</TableHead>
                <TableHead className="text-gray-600 font-medium">Target Roles</TableHead>
                <TableHead className="text-gray-600 font-medium">Status</TableHead>
                <TableHead className="text-gray-600 font-medium">Responses</TableHead>
                <TableHead className="text-gray-600 font-medium">Last Run</TableHead>
                <TableHead className="text-gray-600 font-medium text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSurveys.map((survey) => (
                <TableRow key={survey.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900">
                    {survey.name}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {survey.targetRoles.map((role) => getRoleBadge(role))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(survey.status)}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    <span className="font-medium text-gray-900">{survey.responses}</span>
                    <span className="text-gray-400"> / {survey.totalResponses}</span>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {survey.lastRun || "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/surveys/${survey.id}`}>View Results</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Survey</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        {survey.status === "Draft" && (
                          <DropdownMenuItem>Send Survey</DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
            <span className="text-sm text-gray-500">
              Showing {filteredSurveys.length} of {surveysData.length} surveys
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="text-gray-600"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={true}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="text-gray-600"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
