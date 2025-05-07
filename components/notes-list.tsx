"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Tag, Network, Sparkles } from "lucide-react"

// Sample data - in a real app, this would come from your database
const sampleNotes = [
  {
    id: 1,
    title: "Introduction to Graph Databases",
    content:
      "Graph databases like Neo4j store data in nodes and relationships, making it perfect for connected data...",
    tags: ["neo4j", "databases", "graph theory"],
    createdAt: "2023-05-01T10:30:00Z",
    updatedAt: "2023-05-01T11:45:00Z",
  },
  {
    id: 2,
    title: "AI and Natural Language Processing",
    content: "Modern AI models like Gemini can understand and generate human language with remarkable accuracy...",
    tags: ["ai", "nlp", "gemini"],
    createdAt: "2023-05-03T14:20:00Z",
    updatedAt: "2023-05-03T16:15:00Z",
  },
  {
    id: 3,
    title: "Knowledge Graphs for Learning",
    content: "Connecting concepts in a knowledge graph helps with retention and understanding complex topics...",
    tags: ["learning", "knowledge graph", "study techniques"],
    createdAt: "2023-05-05T09:10:00Z",
    updatedAt: "2023-05-05T10:30:00Z",
  },
]

export function NotesList() {
  const [notes, setNotes] = useState(sampleNotes)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="grid gap-4">
      {notes.map((note) => (
        <Card key={note.id} className="bg-white hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-pastel-primary">{note.title}</CardTitle>
            <CardDescription className="flex items-center text-pastel-secondary">
              <Clock className="h-4 w-4 mr-1" />
              Updated {formatDate(note.updatedAt)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-pastel-dark mb-4">{note.content}</p>
            <div className="flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-pastel-light text-pastel-secondary">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" className="text-pastel-secondary">
              <Network className="h-4 w-4 mr-2" />
              View in Graph
            </Button>
            <Button variant="outline" size="sm" className="text-pastel-secondary">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Insights
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
