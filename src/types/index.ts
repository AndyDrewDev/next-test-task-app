export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed';

export interface TaskAssignee {
  id: string;
  name: string;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate: string;
  assignees: TaskAssignee[];
  createdAt: string;
  updatedAt: string;
}

export interface KanbanColumn {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}

// Mock data
export const defaultUser: User = {
  id: 'mock-user-1',
  name: 'User R.',
  email: 'test-mail@email.com',
  role: 'Developer at White Digital',
  avatar: undefined,
};

