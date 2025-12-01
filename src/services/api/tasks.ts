import { API_CONFIG } from '@/config'
import type { Task, TaskStatus } from '@/types'

const getTasksUrl = (taskId?: string) => {
  const base = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.tasks}`
  return taskId ? `${base}/${taskId}` : base
}

// Generic fetch wrapper with error handling
async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

// API Functions - pure functions without React dependencies
export const tasksApi = {
  getAll: (): Promise<Task[]> => {
    return fetchApi<Task[]>(getTasksUrl())
  },

  getById: (taskId: string): Promise<Task> => {
    return fetchApi<Task>(getTasksUrl(taskId))
  },

  create: (data: Omit<Task, 'id'>): Promise<Task> => {
    return fetchApi<Task>(getTasksUrl(), {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  update: (taskId: string, data: Partial<Task>): Promise<Task> => {
    return fetchApi<Task>(getTasksUrl(taskId), {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  updateStatus: (taskId: string, status: TaskStatus): Promise<Task> => {
    return fetchApi<Task>(getTasksUrl(taskId), {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
  },

  delete: (taskId: string): Promise<void> => {
    return fetchApi<void>(getTasksUrl(taskId), {
      method: 'DELETE',
    })
  },
}

