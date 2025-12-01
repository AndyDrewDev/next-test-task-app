'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useCreateTask, useTaskForm } from '@/hooks'
import { TaskFormFields } from './task-form'
import type { TaskStatus } from '@/types'
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
  const createTask = useCreateTask()

  const form = useTaskForm({
    mode: 'create',
    defaultStatus,
    allowPastDueDate: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = form.validate()
    if (validationErrors.length > 0) {
      toast.error(validationErrors[0].message)
      return
    }

    createTask.mutate(
      form.getSubmitData() as Parameters<typeof createTask.mutate>[0],
      {
        onSuccess: () => {
          toast.success('Task created')
          form.reset()
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
      form.reset()
    }
    onOpenChange(newOpen)
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
          <TaskFormFields
            formData={form.formData}
            getFieldError={form.getFieldError}
            onTitleChange={form.setTitle}
            onDescriptionChange={form.setDescription}
            onStatusChange={form.setStatus}
            onDueDateChange={form.setDueDate}
            idPrefix='create'
            minDueDate={getTodayDate()}
            autoFocusTitle
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
