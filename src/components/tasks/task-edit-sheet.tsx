'use client'

import { useRef, useEffect } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useUpdateTask, useTaskForm } from '@/hooks'
import { TaskFormFields } from './task-form'
import type { Task } from '@/types'
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
  const updateTask = useUpdateTask()
  const dueDateRef = useRef<HTMLInputElement>(null)

  const form = useTaskForm({
    mode: 'edit',
    task,
    allowPastDueDate: true,
  })

  // Reset form when task changes or sheet opens
  useEffect(() => {
    if (open) {
      form.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, task.id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = form.validate()
    if (validationErrors.length > 0) {
      toast.error(validationErrors[0].message)
      return
    }

    updateTask.mutate(
      {
        taskId: task.id,
        data: form.getSubmitData(),
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
      form.reset()
    }
    onOpenChange(newOpen)
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
          <TaskFormFields
            formData={form.formData}
            getFieldError={form.getFieldError}
            onTitleChange={form.setTitle}
            onDescriptionChange={form.setDescription}
            onStatusChange={form.setStatus}
            onDueDateChange={form.setDueDate}
            idPrefix='edit'
            dueDateRef={dueDateRef}
          />

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
