'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDueDate, getInitials } from '@/lib/utils'
import { Calendar, Clock, Users } from 'lucide-react'
import { STATUS_LABELS, type Task } from '@/types'

interface TaskViewModalProps {
  task: Task
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TaskViewModal({
  task,
  open,
  onOpenChange,
}: TaskViewModalProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col overflow-y-auto'>
        <SheetHeader>
          <div className='flex items-start gap-2'>
            <Badge
              variant={task.status === 'completed' ? 'secondary' : 'default'}
              className={
                task.status === 'completed' ? '' : 'bg-success text-white'
              }
            >
              {STATUS_LABELS[task.status]}
            </Badge>
          </div>
          <SheetTitle className='text-left text-xl'>{task.title}</SheetTitle>
          <SheetDescription className='sr-only'>
            Task details for {task.title}
          </SheetDescription>
        </SheetHeader>

        <div className='flex flex-col gap-6 px-4 py-2'>
          {/* Description */}
          {task.description && (
            <div className='space-y-2'>
              <h4 className='text-sm font-medium text-heading'>Description</h4>
              <p className='text-sm text-label whitespace-pre-wrap break-words'>
                {task.description}
              </p>
            </div>
          )}

          {/* Dates */}
          <div className='space-y-3'>
            <h4 className='text-sm font-medium text-heading'>Dates</h4>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2 text-sm text-label'>
                <Calendar className='size-4 text-subtle' />
                <span>Created: {formatDueDate(task.createdAt)}</span>
              </div>
              {task.dueDate && (
                <div className='flex items-center gap-2 text-sm text-label'>
                  <Clock className='size-4 text-subtle' />
                  <span>Due: {formatDueDate(task.dueDate)}</span>
                </div>
              )}
              {task.status === 'completed' && task.completedAt && (
                <div className='flex items-center gap-2 text-sm text-success'>
                  <Clock className='size-4' />
                  <span>Completed: {formatDueDate(task.completedAt)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Assignees */}
          {task.assignees && task.assignees.length > 0 && (
            <div className='space-y-3'>
              <h4 className='text-sm font-medium text-heading flex items-center gap-2'>
                <Users className='size-4' />
                Assignees ({task.assignees.length})
              </h4>
              <div className='flex flex-col gap-2'>
                {task.assignees.map((assignee) => (
                  <div key={assignee.id} className='flex items-center gap-3'>
                    <Avatar className='size-8'>
                      <AvatarImage src={assignee.avatar} alt={assignee.name} />
                      <AvatarFallback className='text-xs bg-neutral text-white'>
                        {getInitials(assignee.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className='text-sm text-label'>{assignee.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
