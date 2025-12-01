'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Task, KanbanColumn, TaskStatus } from '@/types';

const API_URL = 'https://683857ff2c55e01d184cee44.mockapi.io/api/v1/tasks';

const fetchTasks = async (): Promise<Task[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
};

const deleteTask = async (taskId: string): Promise<void> => {
  const res = await fetch(`${API_URL}/${taskId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete task');
};

const updateTaskStatus = async ({ taskId, status }: { taskId: string; status: TaskStatus }): Promise<Task> => {
  const res = await fetch(`${API_URL}/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
};

const updateTask = async ({ taskId, data }: { taskId: string; data: Partial<Task> }): Promise<Task> => {
  const res = await fetch(`${API_URL}/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
};

const createTask = async (data: Omit<Task, 'id'>): Promise<Task> => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
};

export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskStatus,
    onMutate: async ({ taskId, status }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      // Snapshot previous value
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);

      // Optimistically update
      queryClient.setQueryData<Task[]>(['tasks'], (old) =>
        old?.map((task) =>
          task.id === taskId ? { ...task, status } : task
        )
      );

      return { previousTasks };
    },
    onError: (_err, _variables, context) => {
      // Rollback on error
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useTasksByStatus() {
  const { data: tasks, ...rest } = useTasks();

  const columns: KanbanColumn[] = [
    { id: 'to-do', title: 'To do', tasks: [] },
    { id: 'in-progress', title: 'In progress', tasks: [] },
    { id: 'review', title: 'Review', tasks: [] },
    { id: 'completed', title: 'Completed', tasks: [] },
  ];

  if (tasks) {
    for (const task of tasks) {
      const column = columns.find((col) => col.id === task.status);
      if (column) {
        column.tasks.push(task);
      }
    }
  }

  return { columns, ...rest };
}

