import { cn } from '@/lib/utils'

interface EmptySlotProps {
  className?: string
  isDropTarget?: boolean
}

export function EmptySlot({ className, isDropTarget }: EmptySlotProps) {
  return (
    <div
      className={cn(
        'md:min-h-[216px] rounded-[8px] bg-surface transition-colors',
        isDropTarget ? 'dashed-border-success bg-success/10' : 'dashed-border',
        className
      )}
    />
  )
}

interface EmptySlotsProps {
  filledCount: number
  maxSlots: number
  isOver?: boolean
}

export function EmptySlots({ filledCount, maxSlots, isOver }: EmptySlotsProps) {
  const emptyCount = maxSlots - filledCount

  return (
    <>
      {Array.from({ length: emptyCount }).map((_, index) => (
        <EmptySlot
          key={`empty-${index}`}
          isDropTarget={isOver && index === 0}
        />
      ))}
    </>
  )
}
