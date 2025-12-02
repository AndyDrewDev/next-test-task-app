import { VALIDATION_RULES, TASK_STATUSES } from '@/constants'
import type { TaskFormData, TaskStatus } from '@/types'

export interface ValidationError {
  field: string
  message: string
}

export { VALIDATION_RULES }

export function validateTaskForm(
  data: TaskFormData,
  options: { allowPastDueDate?: boolean } = {}
): ValidationError[] {
  const errors: ValidationError[] = []
  const { allowPastDueDate = false } = options

  // Title validation
  const trimmedTitle = data.title.trim()
  if (!trimmedTitle) {
    errors.push({ field: 'title', message: 'Title is required' })
  } else if (trimmedTitle.length < VALIDATION_RULES.title.minLength) {
    errors.push({
      field: 'title',
      message: `Title must be at least ${VALIDATION_RULES.title.minLength} characters`,
    })
  } else if (trimmedTitle.length > VALIDATION_RULES.title.maxLength) {
    errors.push({
      field: 'title',
      message: `Title must be less than ${VALIDATION_RULES.title.maxLength} characters`,
    })
  }

  // Description validation
  if (
    data.description &&
    data.description.length > VALIDATION_RULES.description.maxLength
  ) {
    errors.push({
      field: 'description',
      message: `Description must be less than ${VALIDATION_RULES.description.maxLength} characters`,
    })
  }

  // Status validation
  if (!TASK_STATUSES.includes(data.status as TaskStatus)) {
    errors.push({ field: 'status', message: 'Invalid status' })
  }

  // Due date validation
  if (data.dueDate && !allowPastDueDate) {
    const dueDate = new Date(data.dueDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (dueDate < today) {
      errors.push({
        field: 'dueDate',
        message: 'Due date cannot be in the past',
      })
    }
  }

  return errors
}

export function getFieldError(
  errors: ValidationError[],
  field: string
): string | undefined {
  return errors.find((e) => e.field === field)?.message
}

// Settings validation
export function validateName(value: string): string | undefined {
  if (!value.trim()) {
    return 'Name is required'
  }
  if (value.trim().length < 2) {
    return 'Name must be at least 2 characters'
  }
  return undefined
}

export function validatePassword(value: string): string | undefined {
  if (!value) {
    return 'Password is required'
  }
  if (value.length < 4 || value.length > 12) {
    return 'Password must be between 4 and 12 characters'
  }
  return undefined
}
