"use client";

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { fetchProjects, createProject, deleteProject } from '@/lib/api';
import { Project } from '@/lib/types';

export default function ProjectsPage() {
  const queryClient = useQueryClient();
  const [newProject, setNewProject] = useState('');

  const { data: projects, isLoading, isError } = useQuery<Project[]>(['projects'], fetchProjects);

  const createProjectMutation = useMutation(createProject, {
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
    },
  });

  const deleteProjectMutation = useMutation(deleteProject, {
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
    },
  });

  const handleAddProject = () => {
    if (newProject.trim() !== '') {
      createProjectMutation.mutate({
        name: newProject,
        description: '',
        userId: 1, // Replace with actual user ID
      });
      setNewProject('');
    }
  };

  const handleDeleteProject = (projectId: number) => {
    deleteProjectMutation.mutate(projectId);
  };

  if (isLoading) return <div>Loading projects...</div>;
  if (isError) return <div>Error loading projects</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Projects</h1>
      
      <div className="mb-6 flex items-center space-x-2">
        <Label htmlFor="new-project" className="sr-only">
          New Project
        </Label>
        <Input
          id="new-project"
          placeholder="Add a new project"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleAddProject}>
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add project details or task summary here */}
              <p>Tasks: {project.tasks?.length || 0}</p>
            </CardContent>
            <CardFooter className="flex justify-between mt-auto">
              <Button variant="outline" onClick={() => {/* Navigate to project details */}}>
                View Details
              </Button>
              <Button variant="destructive" onClick={() => handleDeleteProject(project.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}