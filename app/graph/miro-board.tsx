"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function MiroBoardPage({ graphData: initialGraphData }: { graphData?: { nodes: any[] } }) {
  // If graphData is not passed as prop, fetch from API (global graph)
  const [graphData, setGraphData] = useState<{ nodes: any[] }>({ nodes: [] })
  const [checked, setChecked] = useState<{ [id: string]: boolean }>({})
  const [registered, setRegistered] = useState<{ [id: string]: boolean }>({})
  const [statuses, setStatuses] = useState<{ [id: string]: string }>({})
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (initialGraphData) {
      setGraphData(initialGraphData)
    } else {
      setLoading(true)
      fetch("/api/neo4j")
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch tasks. Please try again later.")
          return res.json()
        })
        .then(data => {
          setGraphData({ nodes: data.nodes || [] })
          setError(null)
        })
        .catch(e => {
          setError(e.message || "Failed to load tasks.")
        })
        .finally(() => setLoading(false))
    }
  }, [initialGraphData])

  // Keep checked/registered/statuses in sync with graphData
  useEffect(() => {
    setChecked(prev => {
      const next = { ...prev }
      graphData.nodes.forEach(n => { if (!(n.id in next)) next[n.id] = false })
      Object.keys(next).forEach(id => { if (!graphData.nodes.find(n => n.id === id)) delete next[id] })
      return next
    })
    setRegistered(prev => {
      const next = { ...prev }
      graphData.nodes.forEach(n => { if (!(n.id in next)) next[n.id] = false })
      Object.keys(next).forEach(id => { if (!graphData.nodes.find(n => n.id === id)) delete next[id] })
      return next
    })
    setStatuses(prev => {
      const next = { ...prev }
      graphData.nodes.forEach(n => { if (!(n.id in next)) next[n.id] = "todo" })
      Object.keys(next).forEach(id => { if (!graphData.nodes.find(n => n.id === id)) delete next[id] })
      return next
    })
  }, [graphData.nodes])

  const handleCheck = (id: string) => {
    setChecked(c => ({ ...c, [id]: !c[id] }))
  }

  const handleRegister = (id: string) => {
    setRegistered(r => ({ ...r, [id]: true }))
  }

  const handleRemove = (id: string) => {
    setRegistered(r => ({ ...r, [id]: false }))
    setChecked(c => ({ ...c, [id]: false }))
  }

  const handleStatusChange = (id: string, status: string) => {
    setStatuses(s => ({ ...s, [id]: status }))
  }

  return (
    <div className="min-h-screen bg-pastel-bg py-8">
      <div className="container mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-pastel-primary">Miro-like Task Board</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 rounded px-3 py-2 mb-4 text-sm flex items-center gap-2">
                <span>{error.includes("overloaded") ? "The AI model is overloaded. Please try again in a few minutes." : error}</span>
                <Button size="sm" variant="outline" onClick={() => window.location.reload()}>Retry</Button>
              </div>
            )}
            {loading ? (
              <div className="text-pastel-secondary text-center py-8">Loading tasks...</div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="font-bold text-lg mb-2">Task List</h2>
                  <ul className="space-y-2">
                    {graphData.nodes.map(node => (
                      <li key={node.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={checked[node.id] || false}
                          onChange={() => handleCheck(node.id)}
                          className="accent-pastel-primary"
                        />
                        <span className="font-medium">{node.name || node.label || node.id}</span>
                        <span className="text-xs text-pastel-secondary ml-2">{node.type}</span>
                        {checked[node.id] && !registered[node.id] && (
                          <Button size="sm" className="ml-4" onClick={() => handleRegister(node.id)}>
                            Register
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-bold text-lg mb-2">Registered Tasks</h2>
                  <div className="flex flex-wrap gap-4">
                    {graphData.nodes.filter(n => registered[n.id]).map(node => (
                      <div key={node.id} className="rounded shadow px-3 py-2 bg-white border border-pastel-primary/30 min-w-[140px] min-h-[70px] relative">
                        <div className="font-semibold mb-1">{node.name || node.label || node.id}</div>
                        <div className="text-xs text-pastel-secondary mb-1">{node.type}</div>
                        <select
                          value={statuses[node.id] || "todo"}
                          onChange={e => handleStatusChange(node.id, e.target.value)}
                          className="text-xs rounded border"
                        >
                          <option value="todo">To Do</option>
                          <option value="in-progress">In Progress</option>
                          <option value="done">Done</option>
                        </select>
                        <Button size="sm" variant="ghost" className="absolute top-1 right-1 text-xs text-red-500" onClick={() => handleRemove(node.id)}>
                          Remove
                        </Button>
                      </div>
                    ))}
                    {graphData.nodes.filter(n => registered[n.id]).length === 0 && (
                      <div className="text-pastel-secondary text-sm">No registered tasks yet.</div>
                    )}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <div className="mt-6">
          <Button variant="outline" onClick={() => router.back()}>Back</Button>
        </div>
      </div>
    </div>
  )
}
