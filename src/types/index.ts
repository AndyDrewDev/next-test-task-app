export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

//export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed';

export interface TaskAssignee {
  id: string;
  name: string;
  avatar?: string;
}

// API response type
export type TaskStatus = 'to-do' | 'in-progress' | 'review' | 'completed';

export const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: 'to-do', label: 'To do' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'review', label: 'Review' },
  { value: 'completed', label: 'Completed' },
];

export const STATUS_LABELS = Object.fromEntries(
  STATUS_OPTIONS.map(({ value, label }) => [value, label])
) as Record<TaskStatus, string>;

// export interface Task {
//   id: string;
//   title: string;
//   description?: string;
//   status: TaskStatus;
//   createdAt: string;
// }

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  assignees?: TaskAssignee[];
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

