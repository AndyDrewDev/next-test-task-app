'use client'

import { useState, useCallback, useEffect } from 'react'
import type { Task, TaskFormData, TaskStatus } from '@/types'
import {
  validateTaskForm,
  getFieldError,
  type ValidationError,
} from '@/lib/validation'
import { getTodayDate } from '@/lib/utils'

interface UseTaskFormOptions {
  mode: 'create' | 'edit'
  task?: Task
  defaultStatus?: TaskStatus
  allowPastDueDate?: boolean
  onReset?: () => void
}

interface UseTaskFormReturn {
  // Form state
  formData: TaskFormData
  errors: ValidationError[]
  isDirty: boolean

  // Field setters
  setTitle: (value: string) => void
  setDescription: (value: string) => void
  setStatus: (value: TaskStatus) => void
  setDueDate: (value: string) => void

  // Actions
  validate: () => ValidationError[]
  reset: () => void
  clearFieldError: (field: string) => void

  // Helpers
  getFieldError: (field: string) => string | undefined
  getSubmitData: () => Omit<Task, 'id'> | Partial<Task>
}

function getInitialFormData(options: UseTaskFormOptions): TaskFormData {
  if (options.mode === 'edit' && options.task) {
    return {
      title: options.task.title,
      description: options.task.description || '',
      status: options.task.status,
      dueDate: options.task.dueDate?.split('T')[0] || '',
    }
  }
  return {
    title: '',
    description: '',
    status: options.defaultStatus || 'to-do',
    dueDate: getTodayDate(),
  }
}

export function useTaskForm(options: UseTaskFormOptions): UseTaskFormReturn {
  const { mode, task, allowPastDueDate = mode === 'edit' } = options

  const [formData, setFormData] = useState<TaskFormData>(() =>
    getInitialFormData(options)
  )
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [isDirty, setIsDirty] = useState(false)

  // Sync form data when task changes (for edit mode)
  useEffect(() => {
    if (mode === 'edit' && task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        status: task.status,
        dueDate: task.dueDate?.split('T')[0] || '',
      })
      setErrors([])
      setIsDirty(false)
    }
  }, [mode, task])

  const updateField = useCallback(
    <K extends keyof TaskFormData>(field: K, value: TaskFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
      setIsDirty(true)
      // Clear error for this field
      setErrors((prev) => prev.filter((e) => e.field !== field))
    },
    []
  )

  const setTitle = useCallback(
    (value: string) => updateField('title', value),
    [updateField]
  )
  const setDescription = useCallback(
    (value: string) => updateField('description', value),
    [updateField]
  )
  const setStatus = useCallback(
    (value: TaskStatus) => updateField('status', value),
    [updateField]
  )
  const setDueDate = useCallback(
    (value: string) => updateField('dueDate', value),
    [updateField]
  )

  const validate = useCallback(() => {
    const validationErrors = validateTaskForm(formData, { allowPastDueDate })
    setErrors(validationErrors)
    return validationErrors
  }, [formData, allowPastDueDate])

  const reset = useCallback(() => {
    setFormData(getInitialFormData(options))
    setErrors([])
    setIsDirty(false)
    options.onReset?.()
  }, [options])

  const clearFieldError = useCallback((field: string) => {
    setErrors((prev) => prev.filter((e) => e.field !== field))
  }, [])

  const getFieldErrorFn = useCallback(
    (field: string) => getFieldError(errors, field),
    [errors]
  )

  const getSubmitData = useCallback(() => {
    const now = new Date().toISOString()
    const baseData = {
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      status: formData.status,
      dueDate: formData.dueDate
        ? new Date(formData.dueDate).toISOString()
        : undefined,
      updatedAt: now,
    }

    if (mode === 'create') {
      return {
        ...baseData,
        createdAt: now,
      }
    }

    return baseData
  }, [formData, mode])

  return {
    formData,
    errors,
    isDirty,
    setTitle,
    setDescription,
    setStatus,
    setDueDate,
    validate,
    reset,
    clearFieldError,
    getFieldError: getFieldErrorFn,
    getSubmitData,
  }
}
