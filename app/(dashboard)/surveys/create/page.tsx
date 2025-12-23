"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  ChevronRight, 
  Sparkles, 
  Lock, 
  RefreshCw, 
  Save, 
  Send,
  Loader2,
  Trash2,
  Plus
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface Question {
  id: string
  role: string
  isAISuggestion: boolean
  type: "Scale 1-5" | "Text"
  text: string
}

const initialQuestions: Question[] = [
  {
    id: "1",
    role: "Dev",
    isAISuggestion: true,
    type: "Scale 1-5",
    text: "How clear are the current sprint priorities?"
  },
  {
    id: "2",
    role: "Dev",
    isAISuggestion: true,
    type: "Scale 1-5",
    text: "Do you have the resources needed to complete your work?"
  },
  {
    id: "3",
    role: "Dev",
    isAISuggestion: true,
    type: "Text",
    text: "What is the biggest blocker to your productivity this week?"
  },
  {
    id: "4",
    role: "PM",
    isAISuggestion: true,
    type: "Scale 1-5",
    text: "How aligned is the team on product priorities?"
  },
  {
    id: "5",
    role: "PM",
    isAISuggestion: true,
    type: "Scale 1-5",
    text: "Are stakeholder expectations clearly communicated?"
  },
  {
    id: "6",
    role: "PM",
    isAISuggestion: true,
    type: "Text",
    text: "What process improvement would help the team most?"
  },
]

const availableRoles = ["Dev", "PM", "Lead", "Stakeholder"]

export default function CreateSurveyPage() {
  const router = useRouter()
  const [surveyName, setSurveyName] = useState("")
  const [selectedRoles, setSelectedRoles] = useState<string[]>(["Dev", "PM"])
  const [questions, setQuestions] = useState<Question[]>(initialQuestions)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const toggleRole = (role: string) => {
    setSelectedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role)
        : [...prev, role]
    )
  }

  const updateQuestion = (id: string, text: string) => {
    setQuestions(prev => 
      prev.map(q => q.id === id ? { ...q, text, isAISuggestion: false } : q)
    )
  }

  const deleteQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id))
  }

  const regenerateQuestion = async (id: string) => {
    // TODO: Integrar con OpenAI para regenerar
    toast.info("Regenerando pregunta con IA...")
  }

  const generateQuestionsWithAI = async () => {
    setIsGenerating(true)
    try {
      const res = await fetch("/api/ai/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          context: surveyName || "Team alignment survey",
          targetRoles: selectedRoles,
          questionCount: 6,
          useAI: true
        })
      })
      
      if (res.ok) {
        const data = await res.json()
        const newQuestions: Question[] = data.questions.map((q: { question: string; targetRole: string | null; type: string }, idx: number) => ({
          id: `ai-${Date.now()}-${idx}`,
          role: q.targetRole || selectedRoles[0] || "Dev",
          isAISuggestion: true,
          type: q.type === "TEXT" ? "Text" : "Scale 1-5",
          text: q.question
        }))
        setQuestions(newQuestions)
        toast.success("Preguntas generadas con IA")
      } else {
        toast.error("Error al generar preguntas")
      }
    } catch {
      toast.error("Error al conectar con el servicio de IA")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveDraft = async () => {
    setIsSaving(true)
    try {
      // TODO: Guardar en la API
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Borrador guardado")
    } finally {
      setIsSaving(false)
    }
  }

  const handleActivate = async () => {
    if (!surveyName.trim()) {
      toast.error("Por favor ingresa un nombre para la encuesta")
      return
    }
    if (selectedRoles.length === 0) {
      toast.error("Por favor selecciona al menos un rol")
      return
    }
    if (questions.length === 0) {
      toast.error("Por favor agrega al menos una pregunta")
      return
    }

    setIsSaving(true)
    try {
      // TODO: Crear y activar survey via API
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("¡Encuesta activada!")
      router.push("/surveys")
    } finally {
      setIsSaving(false)
    }
  }

  const addQuestion = () => {
    const newQuestion: Question = {
      id: `new-${Date.now()}`,
      role: selectedRoles[0] || "Dev",
      isAISuggestion: false,
      type: "Scale 1-5",
      text: ""
    }
    setQuestions(prev => [...prev, newQuestion])
  }

  // Filtrar preguntas por roles seleccionados
  const filteredQuestions = questions.filter(q => selectedRoles.includes(q.role))

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">Dashboard</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/surveys" className="hover:text-gray-700">Surveys</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Create Survey</span>
        </nav>

        <div className="space-y-6 max-w-3xl">
          {/* Survey Details */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Survey Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="surveyName" className="text-sm font-medium">Survey Name</Label>
                <Input
                  id="surveyName"
                  placeholder="e.g., Q4 Team Focus"
                  value={surveyName}
                  onChange={(e) => setSurveyName(e.target.value)}
                  className="bg-gray-50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Target Roles */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Target Roles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2 flex-wrap">
                {availableRoles.map((role) => (
                  <Button
                    key={role}
                    variant={selectedRoles.includes(role) ? "default" : "outline"}
                    className={cn(
                      "rounded-full px-4",
                      selectedRoles.includes(role) 
                        ? "bg-blue-600 hover:bg-blue-700 text-white" 
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                    onClick={() => toggleRole(role)}
                  >
                    {role}
                  </Button>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Select the roles you want to survey
              </p>
            </CardContent>
          </Card>

          {/* Questions */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Questions</CardTitle>
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={generateQuestionsWithAI}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-purple-500" />
                  )}
                  Generate Questions with AI
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredQuestions.map((question) => (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  {/* Question Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-white text-gray-600 font-normal">
                        {question.role}
                      </Badge>
                      {question.isAISuggestion && (
                        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-0 gap-1">
                          <Sparkles className="w-3 h-3" />
                          AI Suggestion
                        </Badge>
                      )}
                      <Badge variant="outline" className="bg-white text-gray-600 font-normal">
                        {question.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-gray-400 hover:text-gray-600"
                      >
                        <Lock className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-gray-400 hover:text-gray-600"
                        onClick={() => regenerateQuestion(question.id)}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-gray-400 hover:text-red-500"
                        onClick={() => deleteQuestion(question.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {/* Question Text */}
                  <Textarea
                    value={question.text}
                    onChange={(e) => updateQuestion(question.id, e.target.value)}
                    className="bg-gray-50 border-0 resize-none min-h-[60px]"
                    placeholder="Enter your question..."
                  />
                </div>
              ))}

              {/* Add Question Button */}
              <Button 
                variant="outline" 
                className="w-full gap-2 border-dashed"
                onClick={addQuestion}
              >
                <Plus className="w-4 h-4" />
                Add Question
              </Button>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pb-8">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={handleSaveDraft}
              disabled={isSaving}
            >
              <Save className="w-4 h-4" />
              Save Draft
            </Button>
            <Button 
              className="gap-2 bg-blue-600 hover:bg-blue-700"
              onClick={handleActivate}
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              Activate Survey
            </Button>
          </div>
        </div>
      </div>

      {/* Survey Summary Sidebar */}
      <div className="w-80 border-l border-gray-200 p-6 bg-white">
        <Card className="border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Survey Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Survey Name */}
            <div>
              <p className="text-sm text-gray-500">Survey Name</p>
              <p className="font-medium text-gray-900">
                {surveyName || "Untitled Survey"}
              </p>
            </div>

            {/* Target Roles */}
            <div>
              <p className="text-sm text-gray-500 mb-2">Target Roles</p>
              <div className="flex gap-1 flex-wrap">
                {selectedRoles.length > 0 ? (
                  selectedRoles.map((role) => (
                    <Badge key={role} variant="outline" className="bg-white">
                      {role}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-gray-400">No roles selected</span>
                )}
              </div>
            </div>

            {/* Total Questions */}
            <div>
              <p className="text-sm text-gray-500">Total Questions</p>
              <p className="text-2xl font-semibold text-gray-900">
                {filteredQuestions.length}
              </p>
            </div>

            {/* Estimated Participants */}
            <div>
              <p className="text-sm text-gray-500">Estimated Participants</p>
              <p className="font-medium text-gray-900">
                {selectedRoles.length * 5} team members
              </p>
            </div>

            {/* AI Insights Preview */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-2">AI Insights Preview</p>
              <p className="text-sm text-gray-600">
                {surveyName ? (
                  <>This survey focuses on {surveyName.toLowerCase().includes("sprint") ? "sprint clarity" : "team alignment"} and resource availability. Predicted alignment trend: +3-7 points.</>
                ) : (
                  <>Add a survey name and questions to see AI predictions.</>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
