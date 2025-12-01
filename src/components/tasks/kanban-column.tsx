'use client'

import { useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import type { KanbanColumn as KanbanColumnType, TaskStatus } from '@/types'
import { AddTaskButton } from './add-task-button'
import { DraggableTaskCard } from './draggable-task-card'
import { EmptySlots } from './empty-slot'

interface KanbanColumnProps {
  column: KanbanColumnType
  maxTaskCount: number
  activeTaskStatus?: TaskStatus
  className?: string
}

export function KanbanColumn({
  column,
  maxTaskCount,
  activeTaskStatus,
  className,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  })

  // Don't highlight if dragging from this same column
  const shouldHighlight = isOver && activeTaskStatus !== column.id

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

      <div ref={setNodeRef} className='flex flex-col gap-6'>
        {column.tasks.map((task) => (
          <DraggableTaskCard key={task.id} task={task} />
        ))}

        <EmptySlots
          filledCount={column.tasks.length}
          maxSlots={maxTaskCount + 1}
          isOver={shouldHighlight}
        />
      </div>
    </div>
  )
}
