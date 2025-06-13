"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { tasksApi } from "@/lib/api"
import { CreateTaskButton } from "@/components/create-task-button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function MiroBoardPage({ graphData: initialGraphData }: { graphData?: { nodes: any[] } }) {
  const searchParams = useSearchParams();
  const noteId = searchParams.get("noteId");

  // If graphData is not passed as prop, fetch from API (global graph)
  const [graphData, setGraphData] = useState<{ nodes: any[] }>({ nodes: [] })
  const [checked, setChecked] = useState<{ [id: string]: boolean }>({})
  const [registered, setRegistered] = useState<{ [id: string]: boolean }>({})
  const [statuses, setStatuses] = useState<{ [id: string]: string }>({})
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [registering, setRegistering] = useState(false)
  const [showTaskEditDialog, setShowTaskEditDialog] = useState(false)
  const [tasksToEdit, setTasksToEdit] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    setLoading(true);
    setError(null);
    // If noteId is present, fetch note-specific graph, else global
    const url = noteId ? `/api/neo4j?noteId=${noteId}` : "/api/neo4j";
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch tasks. Please try again later.");
        return res.json();
      })
      .then(data => {
        setGraphData({ nodes: data.nodes || [] });
        setError(null);
      })
      .catch(e => {
        setError(e.message || "Failed to load tasks.");
      })
      .finally(() => setLoading(false));
  }, [noteId, initialGraphData]);

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

  // Register all checked tasks (open edit dialog first)
  const handleRegisterAll = () => {
    const selectedTasks = graphData.nodes.filter(n => checked[n.id] && !registered[n.id]);
    if (selectedTasks.length === 0) return;
    // Pre-fill with current name/description/status
    setTasksToEdit(selectedTasks.map(n => ({
      ...n,
      name: n.name || n.label || '',
      description: n.description || '',
      status: statuses[n.id] || 'todo',
    })));
    setShowTaskEditDialog(true);
  };

  // Save all edited tasks (create them)
  const handleSaveEditedTasks = async () => {
    setRegistering(true);
    try {
      for (const task of tasksToEdit) {
        await tasksApi.create({
          title: task.name,
          description: task.description,
          status: task.status,
          note_id: noteId || undefined,
        });
      }
      setShowTaskEditDialog(false);
      setRegistered(r => {
        const next = { ...r };
        tasksToEdit.forEach(t => { next[t.id] = true; });
        return next;
      });
      setError(null);
      // Redirect to registered tasks page after creation
      router.push("/graph/registered-tasks");
    } catch (e: any) {
      setError(e.message || "Failed to create tasks.");
    } finally {
      setRegistering(false);
    }
  };

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
                  <CreateTaskButton noteId={noteId} onTaskCreated={() => {/* Optionally refresh tasks here */}} />
                  {/* Show Neo4j node labels with checkboxes */}
                  {graphData.nodes && graphData.nodes.length > 0 && (
                    <form
                      onSubmit={async e => {
                        e.preventDefault();
                        setRegistering(true);
                        try {
                          for (const node of graphData.nodes) {
                            if (checked[node.id]) {
                              await tasksApi.create({
                                title: node.label || node.name || node.id,
                                description: node.type || '',
                                status: 'todo',
                                note_id: noteId || undefined,
                              });
                            }
                          }
                          setChecked({});
                          setError(null);
                          router.push("/graph/registered-tasks");
                        } catch (e: any) {
                          setError(e.message || "Failed to create tasks.");
                        } finally {
                          setRegistering(false);
                        }
                      }}
                      className="mt-4 space-y-1"
                    >
                      {graphData.nodes.map(node => (
                        <label key={node.id} className="flex items-center gap-2 text-pastel-secondary text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={checked[node.id] || false}
                            onChange={() => setChecked(c => ({ ...c, [node.id]: !c[node.id] }))}
                            className="accent-pastel-primary"
                          />
                          <span className="font-semibold text-pastel-primary">{node.label || node.name || node.id}</span>
                          {node.type && <span className="ml-2 text-xs">[{node.type}]</span>}
                        </label>
                      ))}
                      {Object.values(checked).some(Boolean) && (
                        <Button
                          type="submit"
                          className="mt-4"
                          disabled={registering}
                        >
                          {registering ? "Registering..." : "Register Selected Tasks"}
                        </Button>
                      )}
                    </form>
                  )}
                </div>
                <div>
                  <h2 className="font-bold text-lg mb-2">Registered Tasks</h2>
                  <div className="flex flex-wrap gap-4">
                    {graphData.nodes.filter(n => registered[n.id]).map(node => (
                      <div key={node.id} className="rounded shadow px-3 py-2 bg-white border border-pastel-primary/30 min-w-[180px] min-h-[90px] w-[180px] h-[90px] flex flex-col justify-between relative">
                        <div>
                          <div className="font-semibold mb-1">{node.name || node.label || node.id}</div>
                          <div className="text-xs text-pastel-secondary mb-1">{node.type}</div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <select
                            value={statuses[node.id] || "todo"}
                            onChange={e => handleStatusChange(node.id, e.target.value)}
                            className="text-xs rounded border flex-1"
                          >
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                          </select>
                          <Button size="sm" variant="ghost" className="text-xs text-red-500" onClick={() => handleRemove(node.id)}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                    {graphData.nodes.filter(n => registered[n.id]).length === 0 && (
                      <div className="text-pastel-secondary text-sm">No registered tasks yet.</div>
                    )}
                  </div>
                </div>
              </>
            )}
            {showTaskEditDialog && (
              <Dialog open={showTaskEditDialog} onOpenChange={setShowTaskEditDialog}>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Edit and Save Tasks</DialogTitle>
                    <DialogDescription>
                      Edit the name and description for each task before saving.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto">
                    {tasksToEdit.map((task, idx) => (
                      <div key={task.id} className="border rounded p-3 bg-pastel-bg">
                        <div className="mb-2">
                          <Label>Name</Label>
                          <Input
                            value={task.name}
                            onChange={e => {
                              const updated = [...tasksToEdit];
                              updated[idx].name = e.target.value;
                              setTasksToEdit(updated);
                            }}
                            className="w-full"
                          />
                        </div>
                        <div className="mb-2">
                          <Label>Description</Label>
                          <Textarea
                            value={task.description}
                            onChange={e => {
                              const updated = [...tasksToEdit];
                              updated[idx].description = e.target.value;
                              setTasksToEdit(updated);
                            }}
                            className="w-full min-h-[60px]"
                          />
                        </div>
                        <div>
                          <Label>Status</Label>
                          <select
                            value={task.status}
                            onChange={e => {
                              const updated = [...tasksToEdit];
                              updated[idx].status = e.target.value;
                              setTasksToEdit(updated);
                            }}
                            className="w-full border rounded px-2 py-1"
                          >
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setShowTaskEditDialog(false)} disabled={registering}>
                      Cancel
                    </Button>
                    <Button type="button" className="bg-pastel-primary hover:bg-pastel-primary/90" onClick={handleSaveEditedTasks} disabled={registering}>
                      {registering ? "Saving..." : "Complete Task Creation"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
