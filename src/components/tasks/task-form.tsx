'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { FormField } from '@/components/ui/form-field'
import { STATUS_OPTIONS } from '@/constants'
import { VALIDATION_RULES } from '@/lib/validation'
import type { TaskFormData, TaskStatus } from '@/types'

interface TaskFormFieldsProps {
  formData: TaskFormData
  getFieldError: (field: string) => string | undefined
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onStatusChange: (value: TaskStatus) => void
  onDueDateChange: (value: string) => void
  idPrefix: string
  minDueDate?: string
  dueDateRef?: React.RefObject<HTMLInputElement | null>
  autoFocusTitle?: boolean
}

export function TaskFormFields({
  formData,
  getFieldError,
  onTitleChange,
  onDescriptionChange,
  onStatusChange,
  onDueDateChange,
  idPrefix,
  minDueDate,
  dueDateRef,
  autoFocusTitle = false,
}: TaskFormFieldsProps) {
  return (
    <>
      <FormField
        label='Title *'
        htmlFor={`${idPrefix}-title`}
        error={getFieldError('title')}
        characterCount={{
          current: formData.title.length,
          max: VALIDATION_RULES.title.maxLength,
        }}
      >
        <Input
          id={`${idPrefix}-title`}
          value={formData.title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder='Enter task title (min 3 characters)'
          autoFocus={autoFocusTitle}
          aria-invalid={!!getFieldError('title')}
        />
      </FormField>

      <FormField
        label='Description'
        htmlFor={`${idPrefix}-description`}
        error={getFieldError('description')}
        characterCount={{
          current: formData.description.length,
          max: VALIDATION_RULES.description.maxLength,
        }}
      >
        <Textarea
          id={`${idPrefix}-description`}
          value={formData.description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder='Enter task description (optional)'
          rows={6}
          aria-invalid={!!getFieldError('description')}
        />
      </FormField>

      <FormField
        label='Status'
        htmlFor={`${idPrefix}-status`}
        error={getFieldError('status')}
      >
        <Select
          id={`${idPrefix}-status`}
          value={formData.status}
          onChange={(e) => onStatusChange(e.target.value as TaskStatus)}
          options={STATUS_OPTIONS}
        />
      </FormField>

      <FormField
        label='Due Date'
        htmlFor={`${idPrefix}-dueDate`}
        error={getFieldError('dueDate')}
        hint={
          idPrefix === 'create'
            ? 'Optional - select when this task should be completed'
            : undefined
        }
      >
        <Input
          ref={dueDateRef}
          id={`${idPrefix}-dueDate`}
          type='date'
          value={formData.dueDate}
          onChange={(e) => onDueDateChange(e.target.value)}
          min={minDueDate}
          aria-invalid={!!getFieldError('dueDate')}
        />
      </FormField>
    </>
  )
}
