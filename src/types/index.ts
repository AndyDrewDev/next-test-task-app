export interface User {
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

