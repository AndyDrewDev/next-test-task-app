'use client'

import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'
import type { Task } from '@/types'
import { TaskCard } from './task-card'

interface DraggableTaskCardProps {
  task: Task
  isOverlay?: boolean
}

export function DraggableTaskCard({ task, isOverlay }: DraggableTaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    })

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  if (isOverlay) {
    return (
      <div className='w-[280px] rotate-2 scale-105 opacity-95 cursor-grabbing shadow-xl'>
        <TaskCard task={task} />
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        'touch-none cursor-grab active:cursor-grabbing outline-none focus:outline-none focus-visible:outline-none',
        isDragging && 'opacity-0'
      )}
    >
      <TaskCard task={task} />
    </div>
  )
}
