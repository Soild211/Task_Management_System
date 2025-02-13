import { create } from 'zustand';

type Task = {
  id: number;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
};

type Project = {
  id: number;
  name: string;
  description: string;
  taskCount: number;
};

type State = {
  tasks: Task[];
  projects: Project[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: number, updates: Partial<Task>) => void;
  deleteTask: (id: number) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: number, updates: Partial<Project>) => void;
  deleteProject: (id: number) => void;
};

export const useStore = create<State>((set) => ({
  tasks: [],
  projects: [],
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, id: Date.now() }],
    })),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, { ...project, id: Date.now() }],
    })),
  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id ? { ...project, ...updates } : project
      ),
    })),
  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
    })),
}));
