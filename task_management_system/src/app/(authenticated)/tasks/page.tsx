"use client";

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { fetchTasks, createTask, updateTask, deleteTask } from '@/lib/api';
import { Task } from '@/lib/types';

export default function TasksPage() {
  const queryClient = useQueryClient();
  const [newTask, setNewTask] = useState('');

  const { data: tasks, isLoading, isError } = useQuery<Task[]>(['tasks'], fetchTasks);

  const createTaskMutation = useMutation(createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    },
  });

  const updateTaskMutation = useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    },
  });

  const deleteTaskMutation = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    },
  });

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      createTaskMutation.mutate({
        title: newTask,
        status: 'todo',
        priority: 'medium',
        userId: 1, // Replace with actual user ID
      });
      setNewTask('');
    }
  };

  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error loading tasks</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Tasks</h1>
      
      <div className="mb-4 flex items-center space-x-2">
        <Label htmlFor="new-task" className="sr-only">
          New Task
        </Label>
        <Input
          id="new-task"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button onClick={handleAddTask}>
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks?.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateTaskMutation.mutate({ id: task.id, status: 'done' })}
                >
                  Mark as Done
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-2"
                  onClick={() => deleteTaskMutation.mutate(task.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
