"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, CheckCircle2, XCircle } from "lucide-react";
import Header from "@/components/common/Header";

interface Task {
  id: string;
  name: string;
  description: string | null;
  status: string;
  user_id: string;
  created_at: string;
}

export default function TestRLSPage() {
  const { userId, isLoaded } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newTask, setNewTask] = useState({ name: "", description: "" });

  // Fetch tasks
  const fetchTasks = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/test-rls");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch tasks");
      }

      setTasks(data.tasks || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Create task
  const createTask = async () => {
    if (!newTask.name.trim()) {
      setError("Task name is required");
      return;
    }

    setCreating(true);
    setError(null);

    try {
      const response = await fetch("/api/test-rls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newTask.name,
          description: newTask.description || null,
          status: "pending",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create task");
      }

      // Refresh tasks
      await fetchTasks();
      // Clear form
      setNewTask({ name: "", description: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    if (isLoaded && userId) {
      fetchTasks();
    }
  }, [isLoaded, userId]);

  if (!isLoaded) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="container mx-auto p-8">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please sign in to test data isolation</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Data Isolation Test</h1>
        <p className="text-muted-foreground mt-2">
          Test Row Level Security (RLS) - Your data is isolated from other users
        </p>
      </div>

      {/* User Info */}
      <Card>
        <CardHeader>
          <CardTitle>Your User ID</CardTitle>
          <CardDescription>This is your unique Clerk user ID</CardDescription>
        </CardHeader>
        <CardContent>
          <code className="text-sm bg-muted p-2 rounded block break-all">{userId}</code>
        </CardContent>
      </Card>

      {/* Create Task Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Task</CardTitle>
          <CardDescription>Create a task to test data isolation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="task-name" className="text-sm font-medium">
              Task Name *
            </label>
            <Input
              id="task-name"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              placeholder="Enter task name"
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="task-description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="task-description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Enter task description (optional)"
              className="mt-1"
            />
          </div>
          <Button onClick={createTask} disabled={creating || !newTask.name.trim()}>
            {creating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Create Task
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Error Message */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-destructive">
              <XCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Tasks</CardTitle>
              <CardDescription>
                You can only see your own tasks (RLS is working if other users' tasks don't appear)
              </CardDescription>
            </div>
            <Button variant="outline" onClick={fetchTasks} disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Refresh"
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No tasks yet. Create your first task above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <Card key={task.id} className="border">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{task.name}</h3>
                          <Badge variant={task.status === "completed" ? "default" : "secondary"}>
                            {task.status}
                          </Badge>
                        </div>
                        {task.description && (
                          <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Created: {new Date(task.created_at).toLocaleString()}</span>
                          <span>User ID: {task.user_id.substring(0, 20)}...</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Testing Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <strong>Step 1:</strong> As User A, create a few tasks above. Note what you created.
          </p>
          <p>
            <strong>Step 2:</strong> Sign out completely, then sign in as User B.
          </p>
          <p>
            <strong>Step 3:</strong> Check this page - User B should NOT see User A's tasks.
          </p>
          <p className="text-muted-foreground mt-4">
            ✅ <strong>Isolation is working</strong> if User B can only see their own tasks (or no tasks if they haven't created any).
          </p>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
