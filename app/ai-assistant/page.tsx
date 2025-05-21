"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CatMascot } from "@/components/cat-mascot"
import { SendHorizontal, Sparkles, Network, FileText, Lightbulb } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AIAssistantPage() {
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [type, setType] = useState<"summary" | "diagram" | "insight">("summary")
  const [responses, setResponses] = useState<
    {
      id: number
      text: string
      type: "summary" | "diagram" | "insight"
    }[]
  >([
    {
      id: 1,
      type: "summary",
      text: "Graph databases store data in nodes and relationships, making them ideal for connected data. Neo4j is a popular graph database that uses Cypher as its query language. Graph databases excel at relationship-heavy queries that would be complex in relational databases.",
    },
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    setIsProcessing(true)

    // Call Gemini API route
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input, type })
      })
      const data = await res.json()
      const newResponse = {
        id: Date.now(),
        type,
        text: data.text || data.error || "No response from Gemini."
      }
      setResponses([...responses, newResponse])
    } catch (err) {
      setResponses([
        ...responses,
        {
          id: Date.now(),
          type,
          text: "Error calling Gemini API."
        }
      ])
    }
    setInput("")
    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-pastel-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-pastel-primary">AI Assistant</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-pastel-primary">Gemini AI Assistant</CardTitle>
                <CardDescription>Ask questions about your notes, get summaries, or create diagrams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto p-2">
                  {responses.map((response) => (
                    <Card key={response.id} className="bg-pastel-light border-none">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          {response.type === "summary" && <FileText className="h-5 w-5 text-pastel-primary mt-1" />}
                          {response.type === "diagram" && <Network className="h-5 w-5 text-pastel-primary mt-1" />}
                          {response.type === "insight" && <Lightbulb className="h-5 w-5 text-pastel-primary mt-1" />}
                          <div>
                            <p className="text-xs font-medium text-pastel-secondary mb-1">
                              {response.type === "summary" && "Summary"}
                              {response.type === "diagram" && "Diagram Suggestion"}
                              {response.type === "insight" && "Insight"}
                            </p>
                            <p className="text-sm text-pastel-dark" dangerouslySetInnerHTML={{ __html: response.text }} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <form onSubmit={handleSubmit} className="w-full">
                  <div className="flex gap-2">
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask a question, request a summary, or describe a diagram you want to create..."
                      className="min-h-[80px] border-pastel-light focus:border-pastel-primary"
                    />
                    <Select value={type} onValueChange={v => setType(v as "summary" | "diagram" | "insight") }>
                      <SelectTrigger className="w-[120px] self-end">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summary">Summary</SelectItem>
                        <SelectItem value="diagram">Diagram</SelectItem>
                        <SelectItem value="insight">Insight</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="submit"
                      className="bg-pastel-primary hover:bg-pastel-primary/90 self-end"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-pastel-light border-t-white" />
                      ) : (
                        <SendHorizontal className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </form>
              </CardFooter>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Tabs defaultValue="actions">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="actions">Actions</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
              </TabsList>
              <TabsContent value="actions" className="mt-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-pastel-primary">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start text-pastel-secondary"
                        onClick={() => {}}
                      >
                        <Sparkles className="h-4 w-4 mr-2 text-pastel-primary" />
                        Summarize all my notes
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-pastel-secondary"
                        onClick={() => {}}
                      >
                        <Network className="h-4 w-4 mr-2 text-pastel-primary" />
                        Create diagram from latest note
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-pastel-secondary"
                        onClick={() => {}}
                      >
                        <Lightbulb className="h-4 w-4 mr-2 text-pastel-primary" />
                        Find knowledge gaps
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <div className="mt-4">
                  <CatMascot message="Ask me to help organize your thoughts or create visualizations!" />
                </div>
              </TabsContent>
              <TabsContent value="examples" className="mt-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-pastel-primary">Example Prompts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <p className="p-2 bg-pastel-light rounded-md cursor-pointer hover:bg-pastel-light/80">
                        "Summarize my notes about Neo4j and graph databases"
                      </p>
                      <p className="p-2 bg-pastel-light rounded-md cursor-pointer hover:bg-pastel-light/80">
                        "Create a diagram showing the relationship between AI and knowledge graphs"
                      </p>
                      <p className="p-2 bg-pastel-light rounded-md cursor-pointer hover:bg-pastel-light/80">
                        "What concepts should I study next based on my current notes?"
                      </p>
                      <p className="p-2 bg-pastel-light rounded-md cursor-pointer hover:bg-pastel-light/80">
                        "Find connections between my notes on learning techniques and AI"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
