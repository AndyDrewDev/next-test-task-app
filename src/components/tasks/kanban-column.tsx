import { cn } from '@/lib/utils'
import type { KanbanColumn as KanbanColumnType } from '@/types'
import { EmptySlots } from './empty-slot'
import { TaskCard } from './task-card'
import { AddTaskButton } from './add-task-button'

interface KanbanColumnProps {
  column: KanbanColumnType
  maxTaskCount: number
  className?: string
}

export function KanbanColumn({
  column,
  maxTaskCount,
  className,
}: KanbanColumnProps) {
  return (
    <div className={cn('space-y-4 md:min-w-[260px] md:flex-1', className)}>
      <div className='flex items-center justify-between'>
        <h2 className='text-base font-medium text-heading'>
          {column.title} ({column.tasks.length})
        </h2>
        <AddTaskButton
          status={column.id}
          label={`Add task to ${column.title}`}
        />
      </div>

      <div className='flex flex-col gap-6'>
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

        <EmptySlots
          filledCount={column.tasks.length}
          maxSlots={maxTaskCount + 1}
        />
      </div>
    </div>
  )
}
