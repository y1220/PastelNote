"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Tag, Network, Sparkles } from "lucide-react"
import { notesApi } from "@/lib/api"

export function NotesList() {
  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true)
      setError(null)
      const response = await notesApi.getAll()
      if (response.error) {
        setError(response.error)
        setNotes([])
      } else {
        setNotes(response.data || [])
      }
      setLoading(false)
    }
    fetchNotes()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (loading) {
    return <div className="text-center text-pastel-secondary py-8">Loading notes...</div>
  }
  if (error) {
    return <div className="text-center text-red-500 py-8">Error: {error}</div>
  }

  return (
    <div className="grid gap-4">
      {notes.map((note) => (
        <Card key={note.id || note._id} className="bg-white hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-pastel-primary">{note.title}</CardTitle>
            <CardDescription className="flex items-center text-pastel-secondary">
              <Clock className="h-4 w-4 mr-1" />
              Updated {formatDate(note.updatedAt || note.updated_at || note.createdAt || note.created_at)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-pastel-dark mb-4">{note.content}</p>
            <div className="flex flex-wrap gap-2">
              {(note.tags || []).map((tag: string) => (
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
