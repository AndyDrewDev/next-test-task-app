import type { Task } from '@/types'
import { TaskCardOptions } from './task-card-options'

interface TaskCardHeaderProps {
  task: Task
  onEdit?: () => void
  onInfo?: () => void
  onTitleClick?: () => void
}

export function TaskCardHeader({
  task,
  onEdit,
  onInfo,
  onTitleClick,
}: TaskCardHeaderProps) {
  return (
    <div className='flex justify-between gap-2 mb-4'>
      <h3
        className='text-base font-medium text-heading leading-6 line-clamp-2 break-words min-w-0 cursor-pointer hover:text-success transition-colors'
        onClick={onTitleClick}
      >
        {task.title}
      </h3>
      <TaskCardOptions task={task} onEdit={onEdit} onInfo={onInfo} />
    </div>
  )
}
