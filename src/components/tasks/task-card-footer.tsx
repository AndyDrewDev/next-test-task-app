interface TaskCardFooterProps {
  children: React.ReactNode
}

export function TaskCardFooter({ children }: TaskCardFooterProps) {
  return <div className='flex items-center justify-between'>{children}</div>
}
