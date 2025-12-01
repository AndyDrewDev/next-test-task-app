'use client'

import { Plus } from 'lucide-react'
import { useTaskCreateSheet } from '@/hooks'
import { TaskCreateSheet } from './task-create-sheet'
import type { TaskStatus } from '@/types'

interface AddTaskButtonProps {
  status: TaskStatus
  label?: string
}

export function AddTaskButton({ status, label }: AddTaskButtonProps) {
  const { isOpen, setIsOpen, open } = useTaskCreateSheet()

  return (
    <>
      <button
        onClick={open}
        className='p-1 rounded text-subtle hover:text-label hover:bg-surface transition-colors cursor-pointer'
        aria-label={label ?? `Add task to ${status}`}
      >
        <Plus className='size-5' />
      </button>

      <TaskCreateSheet
        open={isOpen}
        onOpenChange={setIsOpen}
        defaultStatus={status}
      />
    </>
  )
}
