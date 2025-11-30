import { cn } from '@/lib/utils'

interface EmptySlotProps {
  className?: string
}

export function EmptySlot({ className }: EmptySlotProps) {
  return (
    <div
      className={cn(
        'md:min-h-[216px] rounded-[8px] dashed-border bg-surface',
        className
      )}
    />
  )
}

interface EmptySlotsProps {
  filledCount: number
  maxSlots?: number
  className?: string
}

export function EmptySlots({
  filledCount,
  maxSlots = 3,
  className,
}: EmptySlotsProps) {
  const emptyCount = Math.max(0, maxSlots - filledCount)

  return (
    <>
      {Array.from({ length: emptyCount }).map((_, index) => (
        <EmptySlot key={`empty-${index}`} className={className} />
      ))}
    </>
  )
}
