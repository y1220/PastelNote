"use client"

import type React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"
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

export function CreateNoteButton() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the note to your database here
    console.log({ title, content, tags: tags.split(",").map((tag) => tag.trim()) })
    setOpen(false)
    // Reset form
    setTitle("")
    setContent("")
    setTags("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-pastel-primary hover:bg-pastel-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-pastel-primary">Create a new note</DialogTitle>
            <DialogDescription>
              Add a new note to your collection. It will be automatically analyzed for connections.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-pastel-primary hover:bg-pastel-primary/90">
              Save Note
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
