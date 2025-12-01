import { formatDueDate } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cva, type VariantProps } from 'class-variance-authority'
import { Clock } from 'lucide-react'

const taskCardDueDateVariants = cva(
  'inline-flex items-center gap-1.5 rounded-[4px] px-2.5 py-[5px] text-xs font-medium cursor-pointer',
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
  createdAt?: string
  onClick?: () => void
}

export function TaskCardDueDate({
  dueDate,
  createdAt,
  variant,
  onClick,
}: TaskCardDueDateProps) {
  const badge = (
    <span className={taskCardDueDateVariants({ variant })} onClick={onClick}>
      <Clock className='size-4' />
      {formatDueDate(dueDate)}
    </span>
  )

  if (!createdAt) return badge

  return (
    <Tooltip>
      <TooltipTrigger asChild>{badge}</TooltipTrigger>
      <TooltipContent>Created: {formatDueDate(createdAt)}</TooltipContent>
    </Tooltip>
  )
}
