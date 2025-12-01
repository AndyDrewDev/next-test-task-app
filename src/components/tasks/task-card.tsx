'use client'

import { useState } from 'react'
import type { Task } from '@/types'
import { TaskAssignees } from './task-assignees'
import { TaskCardContent } from './task-card-content'
import { TaskCardDescription } from './task-card-description'
import { TaskCardDueDate } from './task-card-due-date'
import { TaskCardFooter } from './task-card-footer'
import { TaskCardHeader } from './task-card-header'
import { TaskEditSheet } from './task-edit-sheet'
import { TaskViewModal } from './task-view-modal'

interface TaskCardProps {
  task: Task
  className?: string
}

type FocusField = 'title' | 'description' | 'status' | 'dueDate'

export function TaskCard({ task, className }: TaskCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [editFocusField, setEditFocusField] = useState<FocusField | undefined>()
  const isCompleted = task.status === 'completed'

  const openEditSheet = (focusField?: FocusField) => {
    setEditFocusField(focusField)
    setIsEditOpen(true)
  }

  const handleEditOpenChange = (open: boolean) => {
    setIsEditOpen(open)
    if (!open) {
      setEditFocusField(undefined)
    }
  }

  return (
    <>
      <TaskCardContent className={className}>
        <TaskCardHeader
          task={task}
          onEdit={() => openEditSheet()}
          onInfo={() => setIsViewOpen(true)}
          onTitleClick={() => setIsViewOpen(true)}
        />

        <TaskCardDescription
          description={task.description}
          onClick={() => setIsViewOpen(true)}
        />

        <div className='flex-1' />

        <TaskCardFooter>
          <TaskCardDueDate
            dueDate={task.dueDate || task.createdAt}
            createdAt={task.createdAt}
            variant={isCompleted ? 'completed' : 'default'}
            onClick={() => openEditSheet('dueDate')}
          />
          {task.assignees && task.assignees.length > 0 && (
            <TaskAssignees assignees={task.assignees} />
          )}
        </TaskCardFooter>
      </TaskCardContent>

      <TaskViewModal
        task={task}
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
      />

      <TaskEditSheet
        task={task}
        open={isEditOpen}
        onOpenChange={handleEditOpenChange}
        focusField={editFocusField}
      />
    </>
  )
}
