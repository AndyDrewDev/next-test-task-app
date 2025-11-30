import { MoreHorizontal } from 'lucide-react'

interface TaskCardHeaderProps {
  title: string
}

export function TaskCardHeader({ title }: TaskCardHeaderProps) {
  return (
    <div className='flex justify-between mb-4'>
      <h3 className='text-base font-medium text-heading leading-6'>{title}</h3>
      <button
        className='shrink-0 rounded text-subtle hover:bg-surface hover:text-label transition-colors'
        aria-label='Task options'
      >
        <MoreHorizontal className='size-6' />
      </button>
    </div>
  )
}
