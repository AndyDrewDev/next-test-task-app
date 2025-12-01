import type { TaskStatus, User } from '@/types'

// Task Status Constants
export const TASK_STATUSES: readonly TaskStatus[] = ['to-do', 'in-progress', 'review', 'completed'] as const

export const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: 'to-do', label: 'To do' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'review', label: 'Review' },
  { value: 'completed', label: 'Completed' },
]

export const STATUS_LABELS: Record<TaskStatus, string> = {
  'to-do': 'To do',
  'in-progress': 'In progress',
  'review': 'Review',
  'completed': 'Completed',
}

// Default/Mock Data
export const DEFAULT_USER: User = {
  id: 'mock-user-1',
  name: 'User R.',
  email: 'test-mail@email.com',
  role: 'Developer at White Digital',
  avatar: undefined,
}

// Validation Rules
export const VALIDATION_RULES = {
  title: {
    minLength: 3,
    maxLength: 250,
  },
  description: {
    maxLength: 1000,
  },
} as const

