"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

interface Question {
  id: string
  text: string
  type: "scale" | "text"
}

const questions: Question[] = [
  {
    id: "q1",
    text: "How aligned do you feel with the team's current priorities?",
    type: "scale",
  },
  {
    id: "q2",
    text: "How clear are the quarterly goals to you?",
    type: "scale",
  },
  {
    id: "q3",
    text: "What is the biggest friction point in your daily work?",
    type: "text",
  },
  {
    id: "q4",
    text: "How would you rate communication within your team?",
    type: "scale",
  },
  {
    id: "q5",
    text: "Any additional comments or suggestions?",
    type: "text",
  },
]

export default function PublicSurveyPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswer = (value: string | number) => {
    setAnswers({ ...answers, [question.id]: value })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // TODO: Submit to API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSubmitted(true)
      toast.success("Survey submitted successfully!")
    } catch (error) {
      toast.error("Failed to submit survey")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-8 pb-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Thank You!</h2>
            <p className="text-gray-600">
              Your response has been submitted successfully. Your feedback helps us improve team alignment.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-sm">W</span>
          </div>
          <span className="text-gray-900 font-semibold">WorkSense Survey</span>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full">
          <CardHeader>
            <CardTitle className="text-xl">{question.text}</CardTitle>
            {question.type === "scale" && (
              <CardDescription>Select a rating from 1 (Strongly Disagree) to 10 (Strongly Agree)</CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {question.type === "scale" ? (
              <RadioGroup
                value={answers[question.id]?.toString() || ""}
                onValueChange={(value) => handleAnswer(parseInt(value))}
                className="flex flex-wrap gap-3"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <div key={num} className="flex items-center">
                    <RadioGroupItem
                      value={num.toString()}
                      id={`rating-${num}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`rating-${num}`}
                      className="flex items-center justify-center w-10 h-10 rounded-lg border-2 cursor-pointer transition-all peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:text-blue-600 hover:border-gray-300"
                    >
                      {num}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <Textarea
                placeholder="Type your answer here..."
                value={answers[question.id]?.toString() || ""}
                onChange={(e) => handleAnswer(e.target.value)}
                className="min-h-[120px]"
              />
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              {currentQuestion === questions.length - 1 ? (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Survey"}
                </Button>
              ) : (
                <Button onClick={handleNext} className="gap-2">
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto text-center text-sm text-gray-500">
          Your responses are anonymous and help improve team alignment.
        </div>
      </div>
    </div>
  )
}

