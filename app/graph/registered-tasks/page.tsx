"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { tasksApi } from "@/lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const normalizeStatus = (status: string): 'todo' | 'in-progress' | 'done' => {
  if (!status) return 'todo';

  // Convert to lowercase and remove spaces
  const normalized = status.toLowerCase().trim();

  // Handle various possible status formats
  if (normalized === 'inprogress' || normalized === 'in progress' || normalized === 'in-progress' || normalized === 'pending') {
    return 'in-progress';
  }
  if (normalized === 'done' || normalized === 'completed' || normalized === 'finished') {
    return 'done';
  }
  if (normalized === 'todo' || normalized === 'to do' || normalized === 'to-do') {
    return 'todo';
  }

  // Default to 'todo' if unknown status
  return 'todo';
};

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

  const normalizeStatus = (status: string): 'todo' | 'in-progress' | 'done' => {
    if (!status) return 'todo';

    // Convert to lowercase and remove spaces
    const normalized = status.toLowerCase().trim();

    // Handle various possible status formats
    if (normalized === 'inprogress' || normalized === 'in progress' || normalized === 'in-progress' || normalized === 'pending') {
      return 'in-progress';
    }
    if (normalized === 'done' || normalized === 'completed' || normalized === 'finished') {
      return 'done';
    }
    if (normalized === 'todo' || normalized === 'to do' || normalized === 'to-do') {
      return 'todo';
    }

    // Default to 'todo' if unknown status
    return 'todo';
  };

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
          // Normalize the status values
          const normalizedTasks = (res.data || []).map(task => {
            const normalizedStatus = normalizeStatus(task.status);
            console.log('Task:', task.title, 'Original status:', task.status, 'Normalized:', normalizedStatus);
            return {
              ...task,
              status: normalizedStatus
            };
          });
          console.log('All normalized tasks:', normalizedTasks);
          setTasks(normalizedTasks);
          setError(null);
        })
      : tasksApi.getAll().then(res => {
          if (res.error) throw new Error(res.error);
          // Normalize the status values
          const normalizedTasks = (res.data || []).map(task => ({
            ...task,
            status: normalizeStatus(task.status)
          }));
          setTasks(normalizedTasks);
          setError(null);
        });
    apiCall.catch(e => setError(e.message || "Failed to load tasks.")).finally(() => setLoading(false));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'border-yellow-600 bg-yellow-400';
      case 'in-progress':
        return 'border-blue-600 bg-blue-400';
      case 'done':
        return 'border-green-600 bg-green-400';
      default:
        return 'border-gray-600 bg-gray-400';
    }
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
                    variant="outline"
                    onClick={() => setStatusFilter('all')}
                    className={`border-2 ${
                      statusFilter === 'all'
                        ? 'bg-slate-100 border-slate-500 text-slate-700 font-medium'
                        : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                    }`}
                  >All</Button>
                  <Button
                    variant="outline"
                    onClick={() => setStatusFilter('todo')}
                    className={`border-2 ${
                      statusFilter === 'todo'
                        ? 'bg-amber-100 border-amber-500 text-amber-700 font-medium'
                        : 'border-amber-300 hover:border-amber-400 hover:bg-amber-50'
                    }`}
                  >To Do</Button>
                  <Button
                    variant="outline"
                    onClick={() => setStatusFilter('in-progress')}
                    className={`border-2 ${
                      statusFilter === 'in-progress'
                        ? 'bg-sky-100 border-sky-500 text-sky-700 font-medium'
                        : 'border-sky-300 hover:border-sky-400 hover:bg-sky-50'
                    }`}
                  >In Progress</Button>
                  <Button
                    variant="outline"
                    onClick={() => setStatusFilter('done')}
                    className={`border-2 ${
                      statusFilter === 'done'
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-700 font-medium'
                        : 'border-emerald-300 hover:border-emerald-400 hover:bg-emerald-50'
                    }`}
                  >Done</Button>
                </div>
                <div className="flex flex-col gap-3">
                    {filteredTasks.length === 0 && <div className="text-pastel-secondary text-sm">No registered tasks yet.</div>}
                    {filteredTasks.map(task => (
                    <button
                        key={task.id || task._id}
                        className="w-full text-left"
                        onClick={() => openEditDialog(task)}
                    >
                        <div className="rounded-lg shadow px-4 py-3 bg-white border border-gray-200 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                            <div className="w-5 h-5 rounded-full flex-shrink-0" style={{
                                backgroundColor: task.status === 'todo' ? '#FBBF24' :
                                               task.status === 'in-progress' ? '#60A5FA' :
                                               task.status === 'done' ? '#34D399' : '#9CA3AF'
                            }} />
                            <span className="font-medium truncate">{task.title || task.name || task.id}</span>
                        </div>
                    </button>
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
