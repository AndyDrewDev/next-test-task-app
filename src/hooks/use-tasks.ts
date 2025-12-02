'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/config'
import { STATUS_OPTIONS } from '@/constants'
import { tasksApi } from '@/services/api'
import type { Task, KanbanColumn, TaskStatus } from '@/types'

// Query hook - fetches all tasks
export function useTasks() {
  return useQuery({
    queryKey: QUERY_KEYS.tasks,
    queryFn: tasksApi.getAll,
  })
}

// Mutation hook - delete task
export function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: tasksApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tasks })
    },
  })
}

// Mutation hook - update task status with optimistic update
export function useUpdateTaskStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) =>
      tasksApi.updateStatus(taskId, status),
    onMutate: async ({ taskId, status }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.tasks })

      const previousTasks = queryClient.getQueryData<Task[]>(QUERY_KEYS.tasks)

      queryClient.setQueryData<Task[]>(QUERY_KEYS.tasks, (old) =>
        old?.map((task) => {
          if (task.id !== taskId) return task

          const updates: Partial<Task> = { status }
          if (status === 'completed') {
            updates.completedAt = new Date().toISOString().split('T')[0]
          } else {
            updates.completedAt = undefined
          }

          return { ...task, ...updates }
        })
      )

      return { previousTasks }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(QUERY_KEYS.tasks, context.previousTasks)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tasks })
    },
  })
}

// Mutation hook - update task
export function useUpdateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: Partial<Task> }) =>
      tasksApi.update(taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tasks })
    },
  })
}

// Mutation hook - create task
export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: tasksApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tasks })
    },
  })
}

// Derived hook - organizes tasks into kanban columns
export function useTasksByStatus() {
  const { data: tasks, ...rest } = useTasks()

  const columns: KanbanColumn[] = STATUS_OPTIONS.map(({ value, label }) => ({
    id: value,
    title: label,
    tasks: [],
  }))

  if (tasks) {
    for (const task of tasks) {
      const column = columns.find((col) => col.id === task.status)
      column?.tasks.push(task)
    }
  }

  return { columns, ...rest }
}
