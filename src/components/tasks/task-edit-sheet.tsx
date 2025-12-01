'use client'

import { useState, useEffect, useRef } from 'react'
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
import { useUpdateTask } from '@/hooks'
import {
  validateTaskForm,
  getFieldError,
  VALIDATION_RULES,
  type ValidationError,
} from '@/lib/validation'
import { STATUS_OPTIONS, type Task, type TaskStatus } from '@/types'
import { toast } from 'sonner'

type FocusField = 'title' | 'description' | 'status' | 'dueDate'

interface TaskEditSheetProps {
  task: Task
  open: boolean
  onOpenChange: (open: boolean) => void
  focusField?: FocusField
}

export function TaskEditSheet({
  task,
  open,
  onOpenChange,
  focusField,
}: TaskEditSheetProps) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')
  const [status, setStatus] = useState<TaskStatus>(task.status)
  const [dueDate, setDueDate] = useState(task.dueDate?.split('T')[0] || '')
  const [errors, setErrors] = useState<ValidationError[]>([])

  const dueDateRef = useRef<HTMLInputElement>(null)

  const updateTask = useUpdateTask()

  // Sync state when task changes (e.g., after refetch)
  useEffect(() => {
    if (open) {
      setTitle(task.title)
      setDescription(task.description || '')
      setStatus(task.status)
      setDueDate(task.dueDate?.split('T')[0] || '')
      setErrors([])
    }
  }, [task, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // For editing, allow past due dates (task might already have one)
    const validationErrors = validateTaskForm(
      { title, description, status, dueDate },
      { allowPastDueDate: true }
    )

    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      toast.error(validationErrors[0].message)
      return
    }

    setErrors([])

    updateTask.mutate(
      {
        taskId: task.id,
        data: {
          title: title.trim(),
          description: description.trim() || undefined,
          status,
          dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
          updatedAt: new Date().toISOString(),
        },
      },
      {
        onSuccess: () => {
          toast.success('Task updated')
          onOpenChange(false)
        },
        onError: () => {
          toast.error('Failed to update task')
        },
      }
    )
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset form when closing
      setTitle(task.title)
      setDescription(task.description || '')
      setStatus(task.status)
      setDueDate(task.dueDate?.split('T')[0] || '')
      setErrors([])
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
      <SheetContent
        className='flex flex-col'
        onOpenAutoFocus={(e) => {
          if (focusField === 'dueDate') {
            e.preventDefault()
            dueDateRef.current?.focus()
          }
        }}
      >
        <SheetHeader>
          <SheetTitle>Edit Task</SheetTitle>
          <SheetDescription>
            Make changes to your task here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit}
          className='flex flex-col flex-1 gap-4 px-4'
        >
          <FormField
            label='Title *'
            htmlFor='edit-title'
            error={getFieldError(errors, 'title')}
            characterCount={{
              current: title.length,
              max: VALIDATION_RULES.title.maxLength,
            }}
          >
            <Input
              id='edit-title'
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                clearFieldError('title')
              }}
              placeholder='Enter task title (min 3 characters)'
              aria-invalid={!!getFieldError(errors, 'title')}
            />
          </FormField>

          <FormField
            label='Description'
            htmlFor='edit-description'
            error={getFieldError(errors, 'description')}
            characterCount={{
              current: description.length,
              max: VALIDATION_RULES.description.maxLength,
            }}
          >
            <Textarea
              id='edit-description'
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
            htmlFor='edit-status'
            error={getFieldError(errors, 'status')}
          >
            <Select
              id='edit-status'
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              options={STATUS_OPTIONS}
            />
          </FormField>

          <FormField
            label='Due Date'
            htmlFor='edit-dueDate'
            error={getFieldError(errors, 'dueDate')}
          >
            <Input
              ref={dueDateRef}
              id='edit-dueDate'
              type='date'
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value)
                clearFieldError('dueDate')
              }}
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
              disabled={updateTask.isPending}
            >
              {updateTask.isPending ? 'Saving...' : 'Save changes'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
