"use client"

import { useEffect, useState } from "react"
import { Network, CheckSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Task {
  id: string
  title: string
  status: 'todo' | 'in-progress' | 'done'
  priority?: 'low' | 'medium' | 'high'
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
        const res = await fetch(`${BACKEND_URL}/tasks?note_id=${note.id || note._id}`)
        if (!res.ok) throw new Error("Failed to fetch tasks")
        const data = await res.json()
        setTasks(
          Array.isArray(data)
            ? data.map((t: any) => ({
                id: t.id || t._id || String(t.title),
                title: t.title,
                status: t.status || 'todo',
                priority: t.priority || 'medium',
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return { color: '#dc2626', backgroundColor: '#fef2f2', border: '1px solid #fecaca' } // red-600, red-50, red-200
      case "medium":
        return { color: '#d97706', backgroundColor: '#fffbeb', border: '1px solid #fde68a' } // amber-600, amber-50, amber-200
      case "low":
        return { color: '#059669', backgroundColor: '#ecfdf5', border: '1px solid #6ee7b7' } // green-600, green-50, green-200
      default:
        return { color: '#4b5563', backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb' } // gray-600, gray-50, gray-200
    }
  }

  const completedTasks = tasks.filter((task) => task.status === 'done').length
  const totalTasks = tasks.length

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

      {/* Tasks Section - Read Only */}
      <Card className="bg-white/60 backdrop-blur-sm border-white/80 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-emerald-700 text-base">
              <CheckSquare className="h-4 w-4" /> Related Tasks
            </CardTitle>
            <span className="text-xs text-gray-600">
              {completedTasks}/{totalTasks} completed
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="text-gray-400 text-sm py-4">Loading tasks...</div>
          ) : error ? (
            <div className="text-red-500 text-sm py-4">{error}</div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              <CheckSquare className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No tasks found</p>
            </div>
          ) : (
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 p-2 rounded-md border text-sm ${
                    task.status === 'done' ? "bg-green-50/50 border-green-200/50" : "bg-white/50 border-gray-200/50"
                  }`}
                >
                  {/* Status indicator instead of checkbox */}
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor:
                        task.status === 'done'
                          ? '#10b981' // emerald-500
                          : task.status === 'in-progress'
                          ? '#f59e42' // amber-400
                          : '#d1d5db', // gray-300
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm truncate ${task.status === 'done' ? "text-gray-500 line-through" : "text-gray-900"}`}>
                      {task.title}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs px-3 py-0.5 min-w-[64px] text-center" style={getPriorityColor(task.priority || 'medium')}>
                    {task.priority || 'medium'}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
