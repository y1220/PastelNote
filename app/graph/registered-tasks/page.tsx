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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Task Management</h2>
            <p className="text-gray-600">Track and organize your tasks efficiently</p>
          </div>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Registered Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm flex items-center gap-3 backdrop-blur-sm">
                <span>{error}</span>
                <Button size="sm" variant="outline" onClick={() => window.location.reload()}
                  className="border-red-200 hover:border-red-300 hover:bg-red-50">Retry</Button>
              </div>
            )}
            {loading ? (
              <div className="text-gray-600 text-center py-8">Loading tasks...</div>
            ) : (
              <>
                <div className="grid grid-cols-4 gap-3 mb-8">
                  {[
                    { label: 'All', value: 'all', color: '#9CA3AF', gradient: 'from-gray-50 to-gray-100' },
                    { label: 'To Do', value: 'todo', color: '#FBBF24', gradient: 'from-amber-50 to-yellow-100' },
                    { label: 'In Progress', value: 'in-progress', color: '#60A5FA', gradient: 'from-blue-50 to-indigo-100' },
                    { label: 'Done', value: 'done', color: '#34D399', gradient: 'from-emerald-50 to-green-100' }
                  ].map(({ label, value, color, gradient }) => (
                    <button
                      key={value}
                      onClick={() => setStatusFilter(value as any)}
                      className={`h-14 rounded-lg border-2 font-medium flex items-center justify-center transition-all text-base w-full shadow-sm
                        ${statusFilter === value
                          ? `bg-gradient-to-br ${gradient} border-transparent text-gray-700 shadow-md`
                          : 'bg-white/80 hover:bg-white border-gray-200 hover:border-gray-300 text-gray-600'}`}
                    >
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }} />
                      {label}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                    {filteredTasks.length === 0 && (
                      <div className="text-gray-500 text-sm text-center py-8 bg-gray-50/50 rounded-lg border-2 border-dashed border-gray-200">
                        No registered tasks yet
                      </div>
                    )}
                    {filteredTasks.map(task => (
                    <button
                        key={task.id || task._id}
                        className="w-full text-left group"
                        onClick={() => openEditDialog(task)}
                    >
                        <div className={`rounded-lg shadow-sm px-4 py-3 border-2 flex items-center gap-3
                          transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md backdrop-blur-sm
                          ${task.status === 'todo' ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200' :
                            task.status === 'in-progress' ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200' :
                            task.status === 'done' ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200' :
                            'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'}`}>
                            <div className="w-5 h-5 rounded-full flex-shrink-0 shadow-sm" style={{
                                backgroundColor: task.status === 'todo' ? '#FBBF24' :
                                               task.status === 'in-progress' ? '#60A5FA' :
                                               task.status === 'done' ? '#34D399' : '#9CA3AF'
                            }} />
                            <span className="font-medium text-gray-800 truncate">{task.title || task.name || task.id}</span>
                        </div>
                    </button>
                    ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <div className="mt-6 flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="border-gray-200 hover:border-pink-300 hover:bg-pink-50 dark:border-gray-700 dark:hover:border-pink-800 dark:hover:bg-pink-950/10 dark:text-gray-300"
          >
            Back
          </Button>
          <Button
            variant="outline"
            onClick={fetchTasks}
            disabled={loading}
            className="border-gray-200 hover:border-pink-300 hover:bg-pink-50 dark:border-gray-700 dark:hover:border-pink-800 dark:hover:bg-pink-950/10 dark:text-gray-300"
          >
            {loading ? "Refreshing..." : "Refresh Tasks"}
          </Button>
        </div>
      </div>
      {editTask && (
        <Dialog open={!!editTask} onOpenChange={open => { if (!open) setEditTask(null); }}>
          <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle className="text-xl bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Edit Task
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Edit the details of your task and save changes.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-600">Title</label>
                <Input
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  className="border-gray-200 focus:border-pink-300 focus:ring-pink-200 bg-white/80"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-600">Description</label>
                <Textarea
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                  className="border-gray-200 focus:border-pink-300 focus:ring-pink-200 bg-white/80 min-h-[100px]"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-600">Status</label>
                <select
                  value={editStatus}
                  onChange={e => setEditStatus(e.target.value)}
                  className="w-full rounded-md border border-gray-200 bg-white/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditTask(null)}
                disabled={editLoading}
                className="border-gray-200 hover:bg-gray-50 hover:text-gray-700"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleEditSave}
                disabled={editLoading}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                {editLoading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
