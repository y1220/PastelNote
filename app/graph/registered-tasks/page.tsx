"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { tasksApi } from "@/lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function RegisteredTasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editTask, setEditTask] = useState<any | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("todo");
  const [editLoading, setEditLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'todo' | 'in-progress' | 'done'>('all');
  const router = useRouter();

  const filteredTasks = statusFilter === 'all' ? tasks : tasks.filter(t => t.status === statusFilter);

  const fetchTasks = () => {
    setLoading(true);
    setError(null);
    // Get noteId from query param
    const urlParams = new URLSearchParams(window.location.search);
    const noteId = urlParams.get('noteId');
    const apiCall = noteId
      ? tasksApi.getByNoteId(noteId).then(res => {
          if (res.error) throw new Error(res.error);
          setTasks(res.data || []);
          setError(null);
        })
      : tasksApi.getAll().then(res => {
          if (res.error) throw new Error(res.error);
          setTasks(res.data || []);
          setError(null);
        });
    apiCall.catch(e => setError(e.message || "Failed to load tasks.")).finally(() => setLoading(false));
  };

  const openEditDialog = (task: any) => {
    setEditTask(task);
    setEditTitle(task.title || task.name || "");
    setEditDescription(task.description || "");
    setEditStatus(task.status || "todo");
  };

  const handleEditSave = async () => {
    setEditLoading(true);
    // TODO: Implement tasksApi.update when backend supports it
    // For now, just update in-memory for demo
    setTasks(tasks => tasks.map(t => t.id === editTask.id ? { ...t, title: editTitle, description: editDescription, status: editStatus } : t));
    setEditTask(null);
    setEditLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-pastel-bg py-8">
      <div className="container">
        <Card>
          <CardHeader>
            <CardTitle className="text-pastel-primary">Registered Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 rounded px-3 py-2 mb-4 text-sm flex items-center gap-2">
                <span>{error}</span>
                <Button size="sm" variant="outline" onClick={() => window.location.reload()}>Retry</Button>
              </div>
            )}
            {loading ? (
              <div className="text-pastel-secondary text-center py-8">Loading tasks...</div>
            ) : (
              <>
                <div className="flex flex-wrap gap-4 mb-6">
                  <Button
                    variant={statusFilter === 'all' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('all')}
                  >All</Button>
                  <Button
                    variant={statusFilter === 'todo' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('todo')}
                  >To Do</Button>
                  <Button
                    variant={statusFilter === 'in-progress' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('in-progress')}
                  >In Progress</Button>
                  <Button
                    variant={statusFilter === 'done' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('done')}
                  >Done</Button>
                </div>
                <div className="flex flex-wrap gap-4">
                    {filteredTasks.length === 0 && <div className="text-pastel-secondary text-sm">No registered tasks yet.</div>}
                    {filteredTasks.map(task => (
                        <div
                        key={task.id || task._id}
                        className="rounded-lg shadow px-4 py-2 bg-white border border-pastel-primary/30 w-full flex items-center justify-between cursor-pointer hover:bg-pastel-primary/10"
                        onClick={() => openEditDialog(task)}
                        >
                        <div className="font-medium truncate">{task.title || task.name || task.id}</div>
                        <div className="text-sm text-pastel-secondary ml-2">{task.status}</div>
                        </div>
                    ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <div className="mt-6 flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>Back</Button>
          <Button variant="default" onClick={fetchTasks} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh Tasks"}
          </Button>
        </div>
      </div>
      {editTask && (
        <Dialog open={!!editTask} onOpenChange={open => { if (!open) setEditTask(null); }}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>Edit the details of your task and save changes.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-pastel-secondary">Title</label>
                <Input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <label className="text-pastel-secondary">Description</label>
                <Textarea value={editDescription} onChange={e => setEditDescription(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <label className="text-pastel-secondary">Status</label>
                <select value={editStatus} onChange={e => setEditStatus(e.target.value)} className="border rounded px-2 py-1">
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditTask(null)} disabled={editLoading}>Cancel</Button>
              <Button type="button" className="bg-pastel-primary hover:bg-pastel-primary/90" onClick={handleEditSave} disabled={editLoading}>{editLoading ? "Saving..." : "Save Changes"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
