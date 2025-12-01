import { MainLayout } from '@/components/layout'
import { TasksPageContent } from '@/components/tasks'
import { defaultUser } from '@/types'

export default function Home() {
  return (
    <MainLayout user={defaultUser}>
      <TasksPageContent />
    </MainLayout>
  )
}
