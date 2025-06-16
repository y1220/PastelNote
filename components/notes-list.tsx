"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Tag, Network, Sparkles, CheckSquare, Pencil, Cog, BookOpen } from "lucide-react"
import { notesApi } from "@/lib/api"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { NoteDetail } from "@/components/note-detail"

export function NotesList({ onNoteClick }: { onNoteClick?: (note: any) => void }) {
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
  const [expanded, setExpanded] = useState<string | null>(null)
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div key={note.id || note._id}>
            <Card
              className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 relative ${expanded === (note.id || note._id) ? 'ring-2 ring-pastel-primary shadow-lg' : ''}`}
              onClick={e => {
                // Prevent card click if clicking on a button or dropdown
                if ((e.target as HTMLElement).closest('button, [role="menu"]')) return;
                setExpanded(expanded === (note.id || note._id) ? null : (note.id || note._id));
              }}
            >
              {/* Settings dropdown for note actions - absolutely positioned top right */}
              <div className="absolute top-4 right-4 z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-pastel-secondary" aria-label="Note Actions" onClick={e => e.stopPropagation()}>
                      <Cog className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" onClick={e => e.stopPropagation()}>
                    <DropdownMenuItem
                      onClick={e => { e.stopPropagation(); handleGraphify(note.id || note._id) }}
                      disabled={graphifyLoading === (note.id || note._id)}
                    >
                      <Network className="h-4 w-4 mr-2" />
                      {graphifyLoading === (note.id || note._id) ? 'Graphifying...' : 'View in Graph'}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={e => e.stopPropagation() /* TODO: AI Insights action */}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      AI Insights
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={e => { e.stopPropagation(); window.location.href = `/graph/registered-tasks?noteId=${note.id || note._id}` }}
                    >
                      <CheckSquare className="h-4 w-4 mr-2" />
                      See Tasks
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-start gap-4 mb-4">

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <TooltipProvider>
                      <Tooltip delayDuration={200}>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-pastel-secondary"
                            onClick={e => { e.stopPropagation(); openEditModal(note) }}
                            aria-label="Edit Note"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="select-none">
                          Edit
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <h3 className="font-bold text-pastel-primary text-xl font-[Quicksand, Nunito, Comic\ Neue, Arial, sans-serif] truncate">{note.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-1">
                    {(note.tags || []).map((tag: string) => (
                      <Badge key={tag} variant="outline" className="bg-pastel-light text-pastel-secondary font-medium">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-pastel-secondary text-sm mb-1">
                    <Clock className="h-4 w-4 mr-1" />
                    Updated {formatDate(note.updatedAt || note.updated_at || note.createdAt || note.created_at)}
                  </div>
                  {/* Growth Progress */}
                  <div className="mb-2">
                    {(() => {
                      // Assign a random progress value (25, 50, or 75) for display only
                      const progressOptions = [25, 50, 75];
                      // Use note.id or note._id to ensure stable randomization per note
                      const id = note.id || note._id || Math.random();
                      // Simple hash to pick a value based on id
                      let hash = 0;
                      for (let i = 0; i < String(id).length; i++) hash += String(id).charCodeAt(i);
                      const randomProgress = progressOptions[hash % progressOptions.length];
                      return (
                        <>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Growth Progress</span>
                            <span className="font-medium text-emerald-600">{randomProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                              className="h-2 rounded-full transition-all duration-500"
                              style={{
                                width: `${randomProgress}%`,
                                background: 'linear-gradient(to right, #34d399, #10b981)',
                              }}
                            />
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
              {graphifyError && graphifyLoading === null && (graphifyErrorNoteId === (note.id || note._id)) && (
                <div className="text-red-600 bg-red-100 border border-red-300 rounded px-3 py-2 text-xs mt-2 whitespace-pre-wrap">
                  {graphifyError}
                </div>
              )}
              {expanded === (note.id || note._id) && (
                <div className="mt-4 animate-in slide-in-from-top-2 duration-200">
                  <div className="bg-white/90 rounded-xl shadow p-6 border border-pastel-light w-full mx-auto">
                    {/* Show the NoteDetail component for this note */}
                    <NoteDetail note={note} onClose={() => setExpanded(null)} />
                  </div>
                </div>
              )}
            </Card>
          </div>
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
