import { MainLayout, PageHeader } from '@/components/layout'
import { KanbanBoard } from '@/components/tasks'

// Temporary user data
const user = {
  name: 'User R.',
  email: 'test-mail@email.com',
  role: 'Developer at White Digital',
}

export default function Home() {
  return (
    <MainLayout user={user}>
      <PageHeader title='My Tasks' />
      <KanbanBoard />
    </MainLayout>
  )
}
