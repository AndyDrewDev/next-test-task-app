import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { getInitials } from '@/lib/utils'
import type { TaskAssignee } from '@/types'

interface TaskAssigneesProps {
  assignees: TaskAssignee[]
  maxVisible?: number
}

export function TaskAssignees({
  assignees,
  maxVisible = 3,
}: TaskAssigneesProps) {
  if (assignees.length === 0) return null

  const visibleAssignees = assignees.slice(0, maxVisible)
  const remainingCount = assignees.length - maxVisible
  const hiddenAssignees = assignees.slice(maxVisible)

  return (
    <div className='flex items-center -space-x-2'>
      {visibleAssignees.map((assignee) => (
        <Tooltip key={assignee.id}>
          <TooltipTrigger asChild>
            <Avatar className='size-8 border-2 border-white cursor-pointer'>
              <AvatarImage src={assignee.avatar} alt={assignee.name} />
              <AvatarFallback className='text-[10px] bg-neutral text-white cursor-pointer'>
                {getInitials(assignee.name)}
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>{assignee.name}</TooltipContent>
        </Tooltip>
      ))}
      {remainingCount > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className='flex size-8 items-center justify-center rounded-full border-2 border-white bg-surface text-[10px] font-medium text-label cursor-pointer'>
              +{remainingCount}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {hiddenAssignees.map((a) => a.name).join(', ')}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}
