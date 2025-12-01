'use client'

import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { FormField } from '@/components/ui/form-field'
import { useCreateTask } from '@/hooks'
import {
  validateTaskForm,
  getFieldError,
  VALIDATION_RULES,
  type ValidationError,
} from '@/lib/validation'
import { STATUS_OPTIONS, type TaskStatus } from '@/types'
import { toast } from 'sonner'
import { getTodayDate } from '@/lib/utils'

interface TaskCreateSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultStatus?: TaskStatus
}

export function TaskCreateSheet({
  open,
  onOpenChange,
  defaultStatus = 'to-do',
}: TaskCreateSheetProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<TaskStatus>(defaultStatus)
  const [dueDate, setDueDate] = useState(getTodayDate())
  const [errors, setErrors] = useState<ValidationError[]>([])

  const createTask = useCreateTask()

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setStatus(defaultStatus)
    setDueDate(getTodayDate())
    setErrors([])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validateTaskForm(
      { title, description, status, dueDate },
      { allowPastDueDate: false }
    )

    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      toast.error(validationErrors[0].message)
      return
    }

    setErrors([])
    const now = new Date().toISOString()

    createTask.mutate(
      {
        title: title.trim(),
        description: description.trim() || undefined,
        status,
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
        createdAt: now,
        updatedAt: now,
      },
      {
        onSuccess: () => {
          toast.success('Task created')
          resetForm()
          onOpenChange(false)
        },
        onError: () => {
          toast.error('Failed to create task')
        },
      }
    )
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm()
    } else {
      setStatus(defaultStatus)
    }
    onOpenChange(newOpen)
  }

  // Clear field error when user starts typing
  const clearFieldError = (field: string) => {
    if (errors.some((e) => e.field === field)) {
      setErrors(errors.filter((e) => e.field !== field))
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className='flex flex-col'>
        <SheetHeader>
          <SheetTitle>Create Task</SheetTitle>
          <SheetDescription>
            Add a new task to your board. Fill in the details below.
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit}
          className='flex flex-col flex-1 gap-4 px-4'
        >
          <FormField
            label='Title *'
            htmlFor='create-title'
            error={getFieldError(errors, 'title')}
            characterCount={{
              current: title.length,
              max: VALIDATION_RULES.title.maxLength,
            }}
          >
            <Input
              id='create-title'
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                clearFieldError('title')
              }}
              placeholder='Enter task title (min 3 characters)'
              autoFocus
              aria-invalid={!!getFieldError(errors, 'title')}
            />
          </FormField>

          <FormField
            label='Description'
            htmlFor='create-description'
            error={getFieldError(errors, 'description')}
            characterCount={{
              current: description.length,
              max: VALIDATION_RULES.description.maxLength,
            }}
          >
            <Textarea
              id='create-description'
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
                clearFieldError('description')
              }}
              placeholder='Enter task description (optional)'
              rows={6}
              aria-invalid={!!getFieldError(errors, 'description')}
            />
          </FormField>

          <FormField
            label='Status'
            htmlFor='create-status'
            error={getFieldError(errors, 'status')}
          >
            <Select
              id='create-status'
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              options={STATUS_OPTIONS}
            />
          </FormField>

          <FormField
            label='Due Date'
            htmlFor='create-dueDate'
            error={getFieldError(errors, 'dueDate')}
            hint='Optional - select when this task should be completed'
          >
            <Input
              id='create-dueDate'
              type='date'
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value)
                clearFieldError('dueDate')
              }}
              min={new Date().toISOString().split('T')[0]}
              aria-invalid={!!getFieldError(errors, 'dueDate')}
            />
          </FormField>

          <div className='flex-1' />

          <SheetFooter className='px-0'>
            <Button
              type='button'
              variant='outline'
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              variant='success'
              disabled={createTask.isPending}
            >
              {createTask.isPending ? 'Creating...' : 'Create task'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
