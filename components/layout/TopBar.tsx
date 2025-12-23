"use client"

import { Search, Calendar, LogOut, User, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/hooks/use-auth"
import { toast } from "sonner"

const roleColors: Record<string, string> = {
  ADMIN: "bg-red-100 text-red-700",
  PM: "bg-blue-100 text-blue-700",
  EM: "bg-green-100 text-green-700",
  TECH_LEAD: "bg-purple-100 text-purple-700",
  STAKEHOLDER: "bg-orange-100 text-orange-700",
}

const roleLabels: Record<string, string> = {
  ADMIN: "Admin",
  PM: "Product Manager",
  EM: "Engineering Manager",
  TECH_LEAD: "Tech Lead",
  STAKEHOLDER: "Stakeholder",
}

export function TopBar() {
  const { user, logout, isLoading } = useAuth()

  const handleLogout = async () => {
    await logout()
    toast.success("Sesión cerrada")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar insights, acciones..."
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Date selector */}
        <Button variant="outline" className="gap-2">
          <Calendar className="w-4 h-4" />
          <span>Octubre 2025</span>
        </Button>

        {/* User menu */}
        {!isLoading && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 px-2 hover:bg-gray-100">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-900">{user.name}</span>
                  <Badge variant="secondary" className={`text-xs px-1.5 py-0 ${roleColors[user.role] || ""}`}>
                    {roleLabels[user.role] || user.role}
                  </Badge>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{user.name}</span>
                  <span className="text-xs font-normal text-gray-500">{user.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-gray-600">
                <User className="w-4 h-4 mr-2" />
                Mi Perfil
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-gray-200 animate-pulse" />
          </Avatar>
        )}
      </div>
    </div>
  )
}
