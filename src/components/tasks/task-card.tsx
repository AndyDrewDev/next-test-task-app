import type { Task } from '@/types'
import { TaskAssignees } from './task-assignees'
import { TaskCardContent } from './task-card-content'
import { TaskCardDescription } from './task-card-description'
import { TaskCardDueDate } from './task-card-due-date'
import { TaskCardFooter } from './task-card-footer'
import { TaskCardHeader } from './task-card-header'

interface TaskCardProps {
  task: Task
  className?: string
}

export function TaskCard({ task, className }: TaskCardProps) {
  const isCompleted = task.status === 'completed'

  return (
    <TaskCardContent className={className}>
      <TaskCardHeader title={task.title} />

      <TaskCardDescription description={task.description} />

      <div className='flex-1' />

      <TaskCardFooter>
        <TaskCardDueDate
          dueDate={task.dueDate}
          variant={isCompleted ? 'completed' : 'default'}
        />
        <TaskAssignees assignees={task.assignees} />
      </TaskCardFooter>
    </TaskCardContent>
  )
}
