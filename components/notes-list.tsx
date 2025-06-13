"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Tag, Network, Sparkles } from "lucide-react"
import { notesApi } from "@/lib/api"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function NotesList() {
  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editNote, setEditNote] = useState<any | null>(null)
  const [editForm, setEditForm] = useState({ title: '', content: '', tags: '' })
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState<string | null>(null)
  const [graphifyLoading, setGraphifyLoading] = useState<string | null>(null)
  const [graphifyError, setGraphifyError] = useState<string | null>(null)
  const [graphifyErrorNoteId, setGraphifyErrorNoteId] = useState<string | null>(null)
  // Pagination state
  const [page, setPage] = useState(1)
  const [pageSize] = useState(3)
  const [total, setTotal] = useState<number | null>(null)

  const fetchNotes = async (pageNum = page) => {
    setLoading(true)
    setError(null)
    const skip = (pageNum - 1) * pageSize
    const response = await notesApi.getAll({ skip, limit: pageSize })
    if (response.error) {
      setError(response.error)
      setNotes([])
      setTotal(null)
    } else {
      setNotes(response.data || [])
      // If less than pageSize, assume last page
      if (Array.isArray(response.data) && response.data.length < pageSize) {
        setTotal(skip + (response.data?.length || 0))
      } else {
        setTotal(null)
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchNotes(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const openEditModal = (note: any) => {
    setEditNote(note)
    setEditForm({
      title: note.title || '',
      content: note.content || '',
      tags: (note.tags || []).join(', ')
    })
    setEditError(null)
  }

  const closeEditModal = () => {
    setEditNote(null)
    setEditForm({ title: '', content: '', tags: '' })
    setEditError(null)
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editNote) return
    setEditLoading(true)
    setEditError(null)
    const updatedNote = {
      title: editForm.title,
      content: editForm.content,
      tags: editForm.tags.split(',').map(t => t.trim()).filter(Boolean)
    }
    const response = await notesApi.update(editNote.id || editNote._id, updatedNote)
    if (response.error) {
      setEditError(response.error)
    } else {
      closeEditModal()
      fetchNotes()
    }
    setEditLoading(false)
  }

  const handleGraphify = async (noteId: string) => {
    setGraphifyLoading(noteId)
    setGraphifyError(null)
    setGraphifyErrorNoteId(null)
    try {
      const response = await notesApi.graphify(noteId)
      if (response.error) {
        setGraphifyError(response.error)
        setGraphifyErrorNoteId(noteId)
      } else {
        window.open(`/graph/${noteId}`, '_blank')
      }
    } catch (err: any) {
      setGraphifyError(err.message || 'Failed to graphify note.')
      setGraphifyErrorNoteId(noteId)
    } finally {
      setGraphifyLoading(null)
    }
  }

  if (loading) {
    return <div className="text-center text-pastel-secondary py-8">Loading notes...</div>
  }
  if (error) {
    return <div className="text-center text-red-500 py-8">Error: {error}</div>
  }

  return (
    <>
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
            <CardFooter className="flex justify-between gap-2">
              <div className="flex gap-2 items-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-pastel-secondary"
                  onClick={() => handleGraphify(note.id || note._id)}
                  disabled={graphifyLoading === (note.id || note._id)}
                >
                  <Network className="h-4 w-4 mr-2" />
                  {graphifyLoading === (note.id || note._id) ? 'Graphifying...' : 'View in Graph'}
                </Button>
                <Button variant="outline" size="sm" className="text-pastel-secondary">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Insights
                </Button>
                <a
                  href={`/graph/registered-tasks?noteId=${note.id || note._id}`}
                  className="inline-flex items-center px-3 py-1 text-sm font-medium rounded border border-pastel-secondary text-pastel-secondary hover:bg-pastel-light transition-colors ml-2"
                  style={{ textDecoration: 'none' }}
                >
                  <span className="mr-2">See Tasks</span>
                  <span role="img" aria-label="tasks">📝</span>
                </a>
              </div>
              <Button variant="outline" size="sm" className="text-pastel-secondary" onClick={() => openEditModal(note)}>
                Edit
              </Button>
            </CardFooter>
            {graphifyError && graphifyLoading === null && (graphifyErrorNoteId === (note.id || note._id)) && (
              <div className="text-red-600 bg-red-100 border border-red-300 rounded px-3 py-2 text-xs mt-2 whitespace-pre-wrap">
                {graphifyError}
              </div>
            )}
          </Card>
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(page - 1)}
          disabled={page === 1 || loading}
        >
          Previous
        </Button>
        <span className="text-pastel-secondary text-sm">Page {page}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(page + 1)}
          disabled={notes.length < pageSize || (total !== null && page * pageSize >= total) || loading}
        >
          Next
        </Button>
      </div>
      <Dialog open={!!editNote} onOpenChange={open => { if (!open) closeEditModal() }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <Input
              name="title"
              value={editForm.title}
              onChange={handleEditChange}
              placeholder="Title"
              required
            />
            <Textarea
              name="content"
              value={editForm.content}
              onChange={handleEditChange}
              placeholder="Content"
              rows={4}
              required
            />
            <Input
              name="tags"
              value={editForm.tags}
              onChange={handleEditChange}
              placeholder="Tags (comma separated)"
            />
            {editError && <div className="text-red-500 text-sm">{editError}</div>}
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={closeEditModal} disabled={editLoading}>Cancel</Button>
              <Button type="submit" disabled={editLoading}>{editLoading ? 'Saving...' : 'Save'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
