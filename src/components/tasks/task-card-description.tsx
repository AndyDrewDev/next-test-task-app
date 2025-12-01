import { truncateText } from '@/lib/utils'

interface TaskCardDescriptionProps {
  description?: string
  onClick?: () => void
}

const MAX_DESCRIPTION_LENGTH = 350

export function TaskCardDescription({
  description,
  onClick,
}: TaskCardDescriptionProps) {
  if (!description) return null

  const truncatedDescription = truncateText(description, MAX_DESCRIPTION_LENGTH)

  return (
    <p
      className='text-sm leading-6 text-label line-clamp-3 break-words cursor-pointer hover:text-heading transition-colors'
      onClick={onClick}
    >
      {truncatedDescription}
    </p>
  )
}
