// components/notes-api-test.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { notesApi } from "@/lib/api"
import logger from "@/lib/logger"

export function NotesApiTest() {
  const [notes, setNotes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchNotes = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await notesApi.getAll()

      if (response.error) {
        setError(response.error)
      } else {
        setNotes(response.data || [])
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      logger.error(`Failed to fetch notes: ${errorMessage}`)
      setError('Failed to fetch notes. Check the console for more details.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Backend Connection Test</span>
          <Button
            onClick={fetchNotes}
            disabled={isLoading}
            size="sm"
          >
            {isLoading ? 'Loading...' : 'Test Connection'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {notes.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm font-medium">✅ Successfully connected to FastAPI backend</p>
            <p className="text-sm">Found {notes.length} notes:</p>
            <ul className="list-disc pl-5">
              {notes.map((note) => (
                <li key={note.id} className="text-sm">{note.title}</li>
              ))}
            </ul>
          </div>
        ) : !isLoading && !error ? (
          <p className="text-sm text-muted-foreground">
            Click the button above to test the connection to your FastAPI backend.
          </p>
        ) : null}
      </CardContent>
    </Card>
  )
}
