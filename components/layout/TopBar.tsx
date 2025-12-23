"use client"

import { Search, Calendar } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function TopBar() {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search insights, actions..."
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Date selector */}
        <Button variant="outline" className="gap-2">
          <Calendar className="w-4 h-4" />
          <span>October 2025</span>
        </Button>

        {/* User avatar */}
        <Avatar>
          <AvatarFallback className="bg-blue-500 text-white">JD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

