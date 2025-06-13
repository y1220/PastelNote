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
import { tasksApi } from "@/lib/api"

export function CreateTaskButton({ onTaskCreated, noteId }: { onTaskCreated?: () => void, noteId?: string | null } = {}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("todo")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await tasksApi.create({
        title,
        description,
        status,
        note_id: noteId || undefined,
      })
      if (response.error) {
        setError(response.error)
        setLoading(false)
        return
      }
      setOpen(false)
      setTitle("")
      setDescription("")
      setStatus("todo")
      if (onTaskCreated) onTaskCreated()
    } catch (err: any) {
      setError(err.message || "Failed to create task.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-pastel-primary hover:bg-pastel-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-pastel-primary">Create a new task</DialogTitle>
            <DialogDescription>
              Add a new task to your board.
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
                placeholder="Task title"
                className="border-pastel-light focus:border-pastel-primary"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-pastel-secondary">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the task..."
                className="min-h-[100px] border-pastel-light focus:border-pastel-primary"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status" className="text-pastel-secondary">
                Status
              </Label>
              <select
                id="status"
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="border-pastel-light focus:border-pastel-primary rounded px-2 py-1"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" className="bg-pastel-primary hover:bg-pastel-primary/90" disabled={loading}>
              {loading ? "Saving..." : "Save Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
