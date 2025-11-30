interface TaskCardDescriptionProps {
  description?: string
}

export function TaskCardDescription({ description }: TaskCardDescriptionProps) {
  if (!description) return null

  return (
    <p className='text-sm leading-6 text-label line-clamp-3'>{description}</p>
  )
}
