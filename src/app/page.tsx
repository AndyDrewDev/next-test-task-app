import { MainLayout, PageHeader } from '@/components/layout'
import { KanbanBoard } from '@/components/tasks'
import { defaultUser } from '@/types'

export default function Home() {
  return (
    <MainLayout user={defaultUser}>
      <PageHeader title='My Tasks' />
      <KanbanBoard />
    </MainLayout>
  )
}
