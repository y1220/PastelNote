"use client"

import type React from "react"

import { useState } from "react"
import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { notesApi } from "@/lib/api"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function CreateNoteButton({ onNoteCreated }: { onNoteCreated?: () => void } = {}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await notesApi.create({
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      })
      if (response.error) {
        setError(response.error)
        setLoading(false)
        return
      }
      setOpen(false)
      setTitle("")
      setContent("")
      setTags("")
      if (onNoteCreated) onNoteCreated()
    } catch (err: any) {
      setError(err.message || "Failed to create note.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button className="bg-pastel-primary hover:bg-pastel-primary/90 p-2 h-10 w-10 rounded-full flex items-center justify-center" aria-label="New Note">
                <BookOpen className="h-5 w-5" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" className="select-none">
            New Note
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-pastel-primary">Create a new note</DialogTitle>
            <DialogDescription>
              Add a new note to your collection. It will be automatically analyzed for connections.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-pastel-secondary">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title"
                className="border-pastel-light focus:border-pastel-primary"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content" className="text-pastel-secondary">
                Content
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note here..."
                className="min-h-[150px] border-pastel-light focus:border-pastel-primary"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags" className="text-pastel-secondary">
                Tags
              </Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Comma-separated tags (e.g. neo4j, ai, learning)"
                className="border-pastel-light focus:border-pastel-primary"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" className="bg-pastel-primary hover:bg-pastel-primary/90" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
