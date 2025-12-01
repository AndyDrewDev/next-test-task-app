'use client'

import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core'
import { useState } from 'react'
import { useTasksByStatus, useUpdateTaskStatus } from '@/hooks'
import type { Task, TaskStatus } from '@/types'
import { BoardPlaceholder } from './board-placeholder'
import { DraggableTaskCard } from './draggable-task-card'
import { KanbanColumn } from './kanban-column'
import { KanbanError } from './kanban-error'

export function KanbanBoard() {
  const { columns, isLoading, error } = useTasksByStatus()
  const { mutate: updateStatus } = useUpdateTaskStatus()
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  if (isLoading) {
    return <BoardPlaceholder />
  }

  if (error) {
    return <KanbanError />
  }

  const allTasks = columns.flatMap((col) => col.tasks)

  const handleDragStart = (event: DragStartEvent) => {
    const task = allTasks.find((t) => t.id === event.active.id)
    setActiveTask(task || null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveTask(null)

    if (!over) return

    const taskId = active.id as string
    const newStatus = over.id as TaskStatus
    const task = allTasks.find((t) => t.id === taskId)

    if (task && task.status !== newStatus) {
      updateStatus({ taskId, status: newStatus })
    }
  }

  const maxTaskCount = Math.max(...columns.map((col) => col.tasks.length))

  return (
    <div className='overflow-x-clip'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className='mt-8 pb-4 flex flex-col gap-6 md:flex-row md:gap-8 md:overflow-x-auto'>
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              maxTaskCount={maxTaskCount}
              activeTaskStatus={activeTask?.status}
            />
          ))}
        </div>
        <DragOverlay dropAnimation={null}>
          {activeTask && <DraggableTaskCard task={activeTask} isOverlay />}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
