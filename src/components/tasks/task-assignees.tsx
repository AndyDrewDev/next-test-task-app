import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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

  return (
    <div className='flex items-center -space-x-2'>
      {visibleAssignees.map((assignee) => (
        <Avatar
          key={assignee.id}
          className='size-8 border-2 border-white cursor-pointer'
        >
          <AvatarImage src={assignee.avatar} alt={assignee.name} />
          <AvatarFallback className='text-[10px] bg-neutral text-white cursor-pointer'>
            {getInitials(assignee.name)}
          </AvatarFallback>
        </Avatar>
      ))}
      {remainingCount > 0 && (
        <div className='flex size-8 items-center justify-center rounded-full border-2 border-white bg-surface text-[10px] font-medium text-label'>
          +{remainingCount}
        </div>
      )}
    </div>
  )
}
