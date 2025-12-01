// User types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role?: string
}

// Task types
export type TaskStatus = 'to-do' | 'in-progress' | 'review' | 'completed'

export interface TaskAssignee {
  id: string
  name: string
  avatar?: string
}

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  createdAt: string
  updatedAt: string
  dueDate?: string
  assignees?: TaskAssignee[]
}

// Kanban types
export interface KanbanColumn {
  id: TaskStatus
  title: string
  tasks: Task[]
}

// Form types
export interface TaskFormData {
  title: string
  description: string
  status: TaskStatus
  dueDate: string
}

// Re-export constants for backward compatibility
export { STATUS_OPTIONS, STATUS_LABELS, DEFAULT_USER as defaultUser } from '@/constants'
