import { cn } from '@/lib/utils'

interface TaskCardContentProps {
  children: React.ReactNode
  className?: string
}

export function TaskCardContent({ children, className }: TaskCardContentProps) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-[8px] bg-white px-4 py-6 shadow-sm transition-shadow hover:shadow-md md:min-h-[216px]',
        className
      )}
    >
      {children}
    </div>
  )
}
