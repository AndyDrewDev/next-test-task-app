'use client'

import { useTasksByStatus } from '@/hooks'
import { BoardPlaceholder } from './board-placeholder'
import { KanbanColumn } from './kanban-column'
import { KanbanError } from './kanban-error'

export function KanbanBoard() {
  const { columns, isLoading, error } = useTasksByStatus()

  if (isLoading) {
    return <BoardPlaceholder />
  }

  if (error) {
    return <KanbanError />
  }

  return (
    <div className='mt-8 flex flex-col gap-6 md:flex-row md:gap-8 md:overflow-x-auto'>
      {columns.map((column) => (
        <KanbanColumn key={column.id} column={column} />
      ))}
    </div>
  )
}
