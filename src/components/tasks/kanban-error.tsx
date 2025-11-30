import { AlertCircle } from 'lucide-react'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'

export function KanbanError() {
  return (
    <Empty className='mt-8 h-[calc(100vh-12rem)] border border-danger/20 bg-danger/5'>
      <EmptyHeader>
        <EmptyMedia variant='icon' className='bg-danger/10'>
          <AlertCircle className='text-danger' />
        </EmptyMedia>
        <EmptyTitle className='text-danger'>Failed to load tasks</EmptyTitle>
        <EmptyDescription>
          Something went wrong. Please try again later.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
