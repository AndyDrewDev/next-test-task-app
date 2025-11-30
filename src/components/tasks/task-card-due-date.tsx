import { formatDueDate } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { Clock } from 'lucide-react'

const taskCardDueDateVariants = cva(
  'inline-flex items-center gap-1.5 rounded-[4px] px-2.5 py-[5px] text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'bg-success text-white',
        completed: 'bg-surface text-subtle',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface TaskCardDueDateProps
  extends VariantProps<typeof taskCardDueDateVariants> {
  dueDate: string
}

export function TaskCardDueDate({ dueDate, variant }: TaskCardDueDateProps) {
  return (
    <span className={taskCardDueDateVariants({ variant })}>
      <Clock className='size-4' />
      {formatDueDate(dueDate)}
    </span>
  )
}
