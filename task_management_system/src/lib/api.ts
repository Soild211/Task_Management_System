import { Task, Project } from './types';

const API_URL = '/api';

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(`${API_URL}/tasks`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
}

export async function createTask(task: Omit<Task, 'id'>): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  return response.json();
}

export async function updateTask(id: number, updates: Partial<Task>): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, ...updates }),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return response.json();
}

export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
}

export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(`${API_URL}/projects`);
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
}

export async function createProject(project: Omit<Project, 'id'>): Promise<Project> {
  const response = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });
  if (!response.ok) {
    throw new Error('Failed to create project');
  }
  return response.json();
}

export async function updateProject(id: number, updates: Partial<Project>): Promise<Project> {
  const response = await fetch(`${API_URL}/projects`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, ...updates }),
  });
  if (!response.ok) {
    throw new Error('Failed to update project');
  }
  return response.json();
}

export async function deleteProject(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/projects`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error('Failed to delete project');
  }
}
