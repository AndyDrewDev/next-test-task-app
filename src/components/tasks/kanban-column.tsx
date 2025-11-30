import { cn } from '@/lib/utils'
import type { KanbanColumn as KanbanColumnType } from '@/types'
import { EmptySlots } from './empty-slot'
import { TaskCard } from './task-card'

interface KanbanColumnProps {
  column: KanbanColumnType
  className?: string
}

export function KanbanColumn({ column, className }: KanbanColumnProps) {
  return (
    <div className={cn('space-y-4 md:min-w-[260px] md:flex-1', className)}>
      <h2 className='text-base font-medium text-heading'>
        {column.title} ({column.tasks.length})
      </h2>

      <div className='flex flex-col gap-6'>
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

        <EmptySlots filledCount={column.tasks.length} />
      </div>
    </div>
  )
}
