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
  maxSlots: number
}

export function EmptySlots({ filledCount, maxSlots }: EmptySlotsProps) {
  const emptyCount = maxSlots - filledCount

  return (
    <>
      {Array.from({ length: emptyCount }).map((_, index) => (
        <EmptySlot key={`empty-${index}`} />
      ))}
    </>
  )
}
