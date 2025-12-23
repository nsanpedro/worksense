"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/hooks/use-auth"
import { toast } from "sonner"
import { Loader2, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const user = await login(formData.email, formData.password)
      toast.success(`¡Bienvenido, ${user.name}!`)
      router.push("/")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async (email: string) => {
    setFormData({ email, password: "demo123" })
    setIsLoading(true)

    try {
      const user = await login(email, "demo123")
      toast.success(`¡Bienvenido, ${user.name}!`)
      router.push("/")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtMmgtMnYtMmgydi0ySDI0djJoMnYyaC0ydjJoMnY0aC0ydjJoMnYyaC0ydjJoMTJ2LTJoLTJ2LTJoMnYtMmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
      
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <span className="text-white font-bold text-xl">W</span>
          </div>
          <span className="text-2xl font-bold text-white">WorkSense</span>
        </div>

        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl text-white">Iniciar Sesión</CardTitle>
            <CardDescription className="text-slate-400">
              Ingresá a tu cuenta para ver los resultados de tu equipo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-800 px-2 text-slate-400">
                  O probá con una cuenta demo
                </span>
              </div>
            </div>

            {/* Demo accounts */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin("pm@worksense.demo")}
                disabled={isLoading}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                PM
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin("em@worksense.demo")}
                disabled={isLoading}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                EM
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin("techlead@worksense.demo")}
                disabled={isLoading}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                <span className="w-2 h-2 rounded-full bg-purple-500 mr-2" />
                Tech Lead
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin("stakeholder@worksense.demo")}
                disabled={isLoading}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                <span className="w-2 h-2 rounded-full bg-orange-500 mr-2" />
                Stakeholder
              </Button>
            </div>

            <p className="text-center text-sm text-slate-400">
              ¿No tenés cuenta?{" "}
              <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium">
                Registrate
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-6">
          Password para demos: <code className="bg-slate-800 px-2 py-1 rounded text-slate-300">demo123</code>
        </p>
      </div>
    </div>
  )
}

