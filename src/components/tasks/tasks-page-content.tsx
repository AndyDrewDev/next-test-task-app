'use client'

import { PageHeader } from '@/components/layout'
import { KanbanBoard } from './kanban-board'

export function TasksPageContent() {
  return (
    <>
      <PageHeader title='My Tasks' />
      <KanbanBoard />
    </>
  )
}
