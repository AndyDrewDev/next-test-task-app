'use client';

import { useQuery } from '@tanstack/react-query';
import type { Task, TaskStatus, KanbanColumn } from '@/types';

// Mock data - replace with real API call
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Landing Page',
    description: 'Create prototype mobile app for get notifications email in principles',
    status: 'todo',
    priority: 'high',
    dueDate: '2025-03-07',
    assignees: [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
    ],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Landing Page',
    description: 'Create a Web design about minimalist food orders for our beloved clients',
    status: 'todo',
    priority: 'medium',
    dueDate: '2025-03-08',
    assignees: [
      { id: '3', name: 'Bob Johnson' },
      { id: '4', name: 'Alice Brown' },
      { id: '5', name: 'Charlie Wilson' },
    ],
    createdAt: '2024-01-14T09:00:00Z',
    updatedAt: '2024-01-14T09:00:00Z',
  },
  {
    id: '3',
    title: 'Mobile App',
    description: 'Make application design about 20 screen task management plus prototype',
    status: 'todo',
    priority: 'low',
    dueDate: '2025-03-07',
    assignees: [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
      { id: '3', name: 'Bob Johnson' },
    ],
    createdAt: '2024-01-13T08:00:00Z',
    updatedAt: '2024-01-13T08:00:00Z',
  },
  {
    id: '4',
    title: 'Mobile App',
    description: 'Make application design about 20 screen task management plus prototype',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2025-03-07',
    assignees: [
      { id: '2', name: 'Jane Smith' },
      { id: '4', name: 'Alice Brown' },
      { id: '5', name: 'Charlie Wilson' },
    ],
    createdAt: '2024-01-12T07:00:00Z',
    updatedAt: '2024-01-16T11:00:00Z',
  },
  {
    id: '5',
    title: 'Nongki with friend',
    description: 'Hang out with friends to maintain a healthy mind',
    status: 'in_progress',
    priority: 'medium',
    dueDate: '2025-03-07',
    assignees: [
      { id: '3', name: 'Bob Johnson' },
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
    ],
    createdAt: '2024-01-11T06:00:00Z',
    updatedAt: '2024-01-16T12:00:00Z',
  },
  {
    id: '6',
    title: 'Mabar Epep',
    description: 'Play alongside your all-time favorite game, booyah!!',
    status: 'review',
    priority: 'medium',
    dueDate: '2025-03-07',
    assignees: [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
      { id: '3', name: 'Bob Johnson' },
    ],
    createdAt: '2024-01-10T05:00:00Z',
    updatedAt: '2024-01-17T14:00:00Z',
  },
  {
    id: '7',
    title: 'Mabar Epep',
    description: 'Play alongside your all-time favorite game, booyah!!',
    status: 'completed',
    priority: 'low',
    dueDate: '2025-03-07',
    assignees: [
      { id: '4', name: 'Alice Brown' },
      { id: '5', name: 'Charlie Wilson' },
      { id: '1', name: 'John Doe' },
    ],
    createdAt: '2024-01-09T04:00:00Z',
    updatedAt: '2024-01-18T09:00:00Z',
  },
];

const fetchTasks = async (): Promise<Task[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockTasks;
};

export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });
}

export function useTasksByStatus() {
  const { data: tasks, ...rest } = useTasks();

  const columns: KanbanColumn[] = [
    { id: 'todo', title: 'To do', tasks: [] },
    { id: 'in_progress', title: 'In progress', tasks: [] },
    { id: 'review', title: 'Review', tasks: [] },
    { id: 'completed', title: 'Completed', tasks: [] },
  ];

  if (tasks) {
    tasks.forEach((task) => {
      const column = columns.find((col) => col.id === task.status);
      if (column) {
        column.tasks.push(task);
      }
    });
  }

  return { columns, ...rest };
}

