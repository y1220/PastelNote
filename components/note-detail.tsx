"use client"

import { useEffect, useState } from "react"
import { Network, CheckSquare, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

interface Task {
  id: string
  title: string
  status: 'todo' | 'in-progress' | 'done'
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';


export function NoteDetail({ note, onClose }: { note: any; onClose: () => void }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true)
      setError(null)
      try {
        // Call the backend /api/tasks endpoint with noteId as query param
        const res = await fetch(`${BACKEND_URL}/tasks?note_id=${note.id || note._id}`)
        if (!res.ok) throw new Error("Failed to fetch tasks")
        const data = await res.json()
        setTasks(
          Array.isArray(data)
            ? data.map((t: any) => ({
                id: t.id || t._id || String(t.title),
                title: t.title,
                status: t.status || 'todo',
              }))
            : []
        )
      } catch (e: any) {
        setError(e.message || "Failed to load tasks")
        setTasks([])
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [note.id, note._id])

  return (
    <div className="space-y-6">
      {/* Content Preview */}
      <div className="text-gray-700 leading-relaxed text-sm bg-gray-50/50 rounded-lg p-4 border border-gray-100">
        <p className="line-clamp-3">{note.content || "No content available for this note."}</p>
      </div>

      {/* Knowledge Graph Section */}
      <Card className="bg-white/60 backdrop-blur-sm border-white/80 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-purple-700 text-base">
            <Network className="h-4 w-4" /> Knowledge Graph
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-3 min-h-[200px] flex items-center justify-center">
            <img
              src="/graph.png"
              alt="Knowledge Graph showing connected concepts"
              className="max-w-full max-h-[180px] object-contain rounded-lg shadow-sm"
            />
          </div>
          <p className="mt-3 text-xs text-gray-600">Connected concepts and relationships from this note</p>
        </CardContent>
      </Card>

      {/* Tasks Section */}
      <div className="bg-white/60 backdrop-blur-sm border-white/80 shadow-sm rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-emerald-700 text-base flex items-center gap-2">
            <CheckSquare className="h-4 w-4" /> Related Tasks
          </span>
        </div>
        {loading ? (
          <div className="text-gray-400 text-sm py-4">Loading tasks...</div>
        ) : error ? (
          <div className="text-red-500 text-sm py-4">{error}</div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <CheckSquare className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No tasks yet</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between py-2">
                <span className={`truncate text-sm ${task.status === 'done' ? "text-gray-500 line-through" : "text-gray-900"}`}>{task.title}</span>
                <span
                  className={`ml-4 text-xs font-medium px-2 py-0.5 rounded-full
                    ${task.status === 'done' ? "bg-green-50 text-green-700 border border-green-200" :
                      task.status === 'in-progress' ? "bg-amber-50 text-amber-700 border border-amber-200" :
                      "bg-gray-50 text-gray-500 border border-gray-200"}
                  `}
                >
                  {task.status === 'done' ? 'Done' : task.status === 'in-progress' ? 'In Progress' : 'Todo'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
